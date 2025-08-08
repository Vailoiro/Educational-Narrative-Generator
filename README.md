# https://traesgeumvid.vercel.app/ Acesse para testar a ferramenta.

![Captura de Tela do Educational Narrative Generator](https://github.com/Vailoiro/Educational-Narrative-Generator/blob/main/Captura%20de%20tela%202025-08-08%20165448.png?raw=true)

# 📰 Simulador de Narrativas

> Uma ferramenta educativa para explorar diferentes perspectivas jornalísticas e desenvolver pensamento crítico sobre narrativas na mídia.

## 🎯 O que é?

O Simulador de Narrativas é um site que usa inteligência artificial para criar artigos de jornal sobre qualquer assunto que você escolher. É uma ferramenta educativa que ajuda você a:

- 🧠 Desenvolver pensamento crítico sobre notícias
- 📖 Entender como diferentes perspectivas podem contar a mesma história
- 🎓 Aprender sobre jornalismo e mídia
- 🔍 Identificar como a IA pode criar conteúdo

## 🚀 Como usar na sua máquina

### Passo 1: Preparar o computador

Antes de começar, você precisa ter instalado:
- **Node.js** (versão 18 ou mais nova) - [Baixar aqui](https://nodejs.org/)
- **Git** (para baixar o código) - [Baixar aqui](https://git-scm.com/)

### Passo 2: Baixar o projeto

1. Abra o terminal/prompt de comando
2. Digite estes comandos um por vez:

```bash
# Baixa o projeto
git clone <link-do-repositorio>

# Entra na pasta do projeto
cd FN-Generator
```

### Passo 3: Instalar dependências

No terminal, digite:

```bash
npm install
```

*Isso vai baixar todas as bibliotecas necessárias (pode demorar alguns minutos)*

### Passo 4: Executar o projeto

Digite no terminal:

```bash
npm run dev
```

### Passo 5: Abrir no navegador

Abra seu navegador e vá para: **http://localhost:5173**

🎉 **Pronto! O site está funcionando na sua máquina!**

## 🔑 Como configurar sua própria chave de IA

Para usar sem limites, você precisa de uma chave da Google:

1. Vá para [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave que aparecer
5. No site, clique no ícone de engrenagem ⚙️
6. Cole sua chave e clique em "Salvar"

**Sem chave própria:** Você pode testar o site normalmente, mas com algumas limitações.

## 📁 Como o projeto está organizado

```
FN Generator/
├── src/                    # Código principal
│   ├── components/         # Peças reutilizáveis da interface
│   ├── pages/             # Páginas do site
│   ├── lib/               # Funções e configurações
│   └── hooks/             # Funcionalidades especiais
├── public/                # Arquivos públicos
├── package.json           # Lista de dependências
└── README.md             # Este arquivo
```

## 🛠️ Comandos úteis

```bash
# Executar o site
npm run dev

# Criar versão final
npm run build

# Verificar erros
npm run check

# Ver versão final
npm run preview
```

## 🎨 Tecnologias usadas

- **React** - Para criar a interface
- **TypeScript** - Para código mais seguro
- **TailwindCSS** - Para deixar bonito
- **Google Gemini AI** - Para gerar os textos
- **Vite** - Para executar rapidamente

## ⚠️ Importante saber

- ✅ Este projeto é **apenas educativo**
- ✅ Todo conteúdo é **gerado por IA**
- ✅ **Não use** como fonte de notícias reais
- ✅ Sempre **verifique** informações em fontes confiáveis
- ✅ Use para **aprender** sobre mídia e jornalismo

## 🤝 Como contribuir

Quer ajudar a melhorar o projeto?

1. Faça um "fork" do projeto
2. Crie suas melhorias
3. Envie suas sugestões

Todas as contribuições são bem-vindas!

## 📞 Precisa de ajuda?

Se algo não funcionou:

1. Verifique se o Node.js está instalado corretamente
2. Certifique-se de estar na pasta certa do projeto
3. Tente executar `npm install` novamente
4. Verifique se não há erros no terminal

---

**Feito com ❤️ para educação e pensamento crítico**

*Versão simplificada - Qualquer pessoa pode usar!*