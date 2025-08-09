import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wwjwqopsvormthicpmxt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3andxb3Bzdm9ybXRoaWNwbXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1ODQ4MzUsImV4cCI6MjA3MDE2MDgzNX0.5nQpawqYjTu4eOOrPIJ6YvIGHQGpwJDmL1NKrVphWcs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SystemConfig {
  id: string
  config_key: string
  config_value: string
  created_at: string
  updated_at: string
}

export async function getSystemConfig(configKey: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('system_config')
      .select('config_value')
      .eq('config_key', configKey)
      .single()

    if (error) {
      console.error('Error fetching system config:', error)
      return null
    }

    return data?.config_value || null
  } catch (error) {
    console.error('Error in getSystemConfig:', error)
    return null
  }
}

export async function getGeminiApiKey(): Promise<string | null> {
  return getSystemConfig('gemini_api_key')
}

export async function updateSystemConfig(configKey: string, configValue: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('system_config')
      .upsert({
        config_key: configKey,
        config_value: configValue,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error updating system config:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in updateSystemConfig:', error)
    return false
  }
}