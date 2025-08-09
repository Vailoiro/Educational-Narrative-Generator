interface AuditLogEntry {
  id: string
  timestamp: number
  event: 'generation_attempt' | 'generation_success' | 'generation_failure' | 'rate_limit_exceeded' | 'api_key_configured' | 'api_key_removed'
  clientId: string
  details: {
    topic?: string
    error?: string
    hasCustomKey?: boolean
    freeAttemptsRemaining?: number
    rateLimitInfo?: any
    userAgent?: string
    sessionId?: string
  }
}

interface UsageAlert {
  id: string
  timestamp: number
  type: 'high_usage' | 'rate_limit_exceeded' | 'suspicious_activity'
  clientId: string
  message: string
  severity: 'low' | 'medium' | 'high'
}

class AuditLogger {
  private logs: AuditLogEntry[] = []
  private alerts: UsageAlert[] = []
  private maxLogEntries = 1000
  private maxAlerts = 100
  private enabled: boolean

  constructor() {
    this.enabled = import.meta.env.VITE_ENABLE_AUDIT_LOGS === 'true'
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    try {
      const storedLogs = localStorage.getItem('audit_logs')
      const storedAlerts = localStorage.getItem('usage_alerts')
      
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs)
      }
      
      if (storedAlerts) {
        this.alerts = JSON.parse(storedAlerts)
      }
    } catch (error) {
      console.warn('Failed to load audit logs from storage:', error)
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('audit_logs', JSON.stringify(this.logs.slice(-this.maxLogEntries)))
      localStorage.setItem('usage_alerts', JSON.stringify(this.alerts.slice(-this.maxAlerts)))
    } catch (error) {
      console.warn('Failed to save audit logs to storage:', error)
    }
  }

  private getClientId(): string {
    let clientId = localStorage.getItem('client_id')
    if (!clientId) {
      clientId = crypto.randomUUID()
      localStorage.setItem('client_id', clientId)
    }
    return clientId
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }

  log(event: AuditLogEntry['event'], details: AuditLogEntry['details'] = {}): void {
    if (!this.enabled) return

    const entry: AuditLogEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      event,
      clientId: this.getClientId(),
      details: {
        ...details,
        userAgent: navigator.userAgent,
        sessionId: this.getSessionId()
      }
    }

    this.logs.push(entry)
    
    if (this.logs.length > this.maxLogEntries) {
      this.logs = this.logs.slice(-this.maxLogEntries)
    }

    this.saveToStorage()
    this.checkForAlerts(entry)
  }

  private checkForAlerts(entry: AuditLogEntry): void {
    const alertsEnabled = import.meta.env.VITE_ENABLE_USAGE_ALERTS === 'true'
    if (!alertsEnabled) return

    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    const recentLogs = this.logs.filter(log => 
      log.clientId === entry.clientId && 
      now - log.timestamp < oneHour
    )

    if (entry.event === 'rate_limit_exceeded') {
      this.createAlert('rate_limit_exceeded', entry.clientId, 
        'Rate limit exceeded multiple times', 'medium')
    }

    const generationAttempts = recentLogs.filter(log => 
      log.event === 'generation_attempt'
    ).length

    if (generationAttempts > 20) {
      this.createAlert('high_usage', entry.clientId, 
        `High usage detected: ${generationAttempts} attempts in the last hour`, 'high')
    }

    const failureRate = recentLogs.filter(log => 
      log.event === 'generation_failure'
    ).length / Math.max(1, generationAttempts)

    if (failureRate > 0.5 && generationAttempts > 5) {
      this.createAlert('suspicious_activity', entry.clientId, 
        `High failure rate detected: ${Math.round(failureRate * 100)}%`, 'medium')
    }
  }

  private createAlert(type: UsageAlert['type'], clientId: string, message: string, severity: UsageAlert['severity']): void {
    const alert: UsageAlert = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type,
      clientId,
      message,
      severity
    }

    this.alerts.push(alert)
    
    if (this.alerts.length > this.maxAlerts) {
      this.alerts = this.alerts.slice(-this.maxAlerts)
    }

    this.saveToStorage()
    
    if (severity === 'high') {
      console.warn('Security Alert:', alert)
    }
  }

  getRecentLogs(hours: number = 24): AuditLogEntry[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000)
    return this.logs.filter(log => log.timestamp > cutoff)
  }

  getAlerts(hours: number = 24): UsageAlert[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000)
    return this.alerts.filter(alert => alert.timestamp > cutoff)
  }

  getUsageStats(hours: number = 24): {
    totalAttempts: number
    successfulGenerations: number
    failedGenerations: number
    rateLimitHits: number
    successRate: number
  } {
    const recentLogs = this.getRecentLogs(hours)
    
    const totalAttempts = recentLogs.filter(log => log.event === 'generation_attempt').length
    const successfulGenerations = recentLogs.filter(log => log.event === 'generation_success').length
    const failedGenerations = recentLogs.filter(log => log.event === 'generation_failure').length
    const rateLimitHits = recentLogs.filter(log => log.event === 'rate_limit_exceeded').length
    
    return {
      totalAttempts,
      successfulGenerations,
      failedGenerations,
      rateLimitHits,
      successRate: totalAttempts > 0 ? successfulGenerations / totalAttempts : 0
    }
  }

  clearLogs(): void {
    this.logs = []
    this.alerts = []
    localStorage.removeItem('audit_logs')
    localStorage.removeItem('usage_alerts')
  }
}

export const auditLogger = new AuditLogger()
export type { AuditLogEntry, UsageAlert }