# Troubleshooting - Sistema de Tentativas Gratuitas

## Problema: Funcionalidade não aparece no navegador externo

Se o contador de tentativas gratuitas aparece no TRAE mas não no navegador externo, siga estes passos:

### 1. Limpar Cache do Navegador

**Chrome/Edge:**
- Pressione `Ctrl + Shift + Delete`
- Selecione "Cookies e outros dados do site" e "Imagens e arquivos em cache"
- Clique em "Limpar dados"

**Firefox:**
- Pressione `Ctrl + Shift + Delete`
- Selecione "Cache" e "Cookies"
- Clique em "Limpar agora"

### 2. Forçar Atualização

- Pressione `Ctrl + F5` ou `Ctrl + Shift + R` para forçar reload
- Ou pressione `F12` para abrir DevTools, clique com botão direito no botão de reload e selecione "Esvaziar cache e recarregar"

### 3. Verificar localStorage

Abra o arquivo `reset-localStorage.html` no navegador e:
1. Clique em "Check Current State" para ver o estado atual
2. Se necessário, clique em "Initialize Trial Mode" para resetar
3. Recarregue a aplicação principal

### 4. Verificar Console

Abra o DevTools (F12) e verifique se há:
- Logs de "Store Initialization Debug"
- Logs de "TrialCounter Debug"
- Logs de "Header Debug"

### 5. Modo Incógnito

Teste a aplicação em modo incógnito/privado para verificar se o problema é relacionado ao cache.

### 6. Verificar Estado Esperado

O contador deve aparecer quando:
- Não há chave API personalizada configurada
- Ainda há tentativas gratuitas disponíveis (0-2)
- `isTrialMode` é `true`

### 7. Resetar Completamente

Se nada funcionar:
1. Abra `reset-localStorage.html`
2. Clique em "Reset All Data"
3. Clique em "Initialize Trial Mode"
4. Feche e reabra o navegador
5. Acesse a aplicação novamente

## Logs de Debug

Os seguintes logs devem aparecer no console:

```
Store Initialization Debug: {
  initialApiKey: false,
  initialFreeAttempts: 0,
  maxFreeAttempts: 2,
  freeAttemptsRemaining: 2,
  isTrialMode: true,
  localStorage: { ... }
}

TrialCounter Debug: {
  freeAttemptsRemaining: 2,
  isTrialMode: true,
  freeAttemptsUsed: 0,
  shouldShow: true
}

Header Debug: {
  hasCustomApiKey: false,
  shouldShowTrialCounter: true
}
```

## Chaves localStorage Utilizadas

- `narratives_api_key`: Chave API do usuário
- `narratives_preferences`: Configurações incluindo tentativas usadas
- `narratives_session_id`: ID da sessão
- `narratives_history`: Histórico de gerações
- `narratives_usage`: Dados de uso

## Contato

Se o problema persistir, verifique:
1. Se o servidor de desenvolvimento está rodando (`npm run dev`)
2. Se não há erros no console do navegador
3. Se a versão do navegador é compatível