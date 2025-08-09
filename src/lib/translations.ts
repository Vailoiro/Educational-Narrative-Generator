export const SUPPORTED_LANGUAGES = {
  PT: 'pt-BR',
  EN: 'en-US',
} as const;

export type Language = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];

export interface Translations {
  header: {
    title: string;
    subtitle: string;
    generator: string;
    history: string;
    about: string;
    generatorDescription: string;
    historyDescription: string;
    aboutDescription: string;
    apiConfigured: string;
    apiNotConfigured: string;
    configureApi: string;
  };
  generator: {
    title: string;
    subtitle: string;
    placeholder: string;
    generateButton: string;
    newGeneration: string;
    topicRequired: string;
    topicTooShort: string;
    configureApiKey: string;
    trialExhausted: string;
    unexpectedError: string;
    connectionError: string;
    freeTrialMessage: string;
    freeTrialInfo: string;
    freeTrialExhausted: string;
    attempt: string;
    attempts: string;
    remaining: string;
    free: string;
    unlimited: string;
    errorTitle: string;
    generating: string;
    generatingSubtext: string;
    configureApi: string;
    unlimitedUsage: string;
    apiKeyRequired: string;
    poweredBy: string;
    unspecifiedTopic: string;
    emptyState: {
      title: string;
      description: string;
      startButton: string;
    };
  };
  trialCounter: {
    exhausted: string;
    remaining: string;
    attempt: string;
    attempts: string;
    addApiKey: string;
  };
  topicInput: {
    label: string;
    placeholder: string;
    placeholderExamples: string[];
    examples: string;
    generate: string;
    generating: string;
    suggestions: string;
  };
  articleDisplay: {
    generatedAt: string;
    topic: string;
    demoMode: string;
    newGeneration: string;
    copyArticle: string;
    copied: string;
    shareArticle: string;
    demoMessage: string;
    generatedArticle: string;
    showMore: string;
    showLess: string;
    copy: string;
    share: string;
    noArticlesYet: string;
    articlesWillAppear: string;
    generationHistory: string;
    showingRecent: string;
  };
  configModal: {
    title: string;
    subtitle: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    getApiKey: string;
    save: string;
    cancel: string;
    remove: string;
    invalidKey: string;
    saveSuccess: string;
    removeSuccess: string;
    instructions: string;
    unlimitedUseTitle: string;
    unlimitedUseDescription: string;
    saving: string;
    removeKey: string;
    saveKey: string;
    enterApiKey: string;
    invalidFormat: string;
    saveError: string;
    unexpectedError: string;
  };
  history: {
    title: string;
    subtitle: string;
    empty: string;
    emptyDescription: string;
    generatedAt: string;
    demoMode: string;
    remove: string;
    clear: string;
    confirmClear: string;
    items: string;
    article: string;
    articles: string;
    searchPlaceholder: string;
    noResults: string;
    tryOtherTerms: string;
    loadError: string;
    loadErrorDescription: string;
    reload: string;
    deleteArticle: string;
    viewArticle: string;
    goToGenerator: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission: {
      title: string;
      description: string;
    };
    howItWorks: {
      title: string;
      description: string;
    };
    features: {
      title: string;
      educational: {
        title: string;
        description: string;
      };
      ethics: {
        title: string;
        description: string;
      };
      creative: {
        title: string;
        description: string;
      };
    };
    techStack: {
      title: string;
      react: {
        name: string;
        description: string;
      };
      typescript: {
        name: string;
        description: string;
      };
      tailwind: {
        name: string;
        description: string;
      };
      gemini: {
        name: string;
        description: string;
      };
      zustand: {
        name: string;
        description: string;
      };
    };
    responsibleUse: {
      title: string;
      educational: {
        title: string;
        description: string;
      };
      transparency: {
        title: string;
        description: string;
      };
      noPublication: {
        title: string;
        description: string;
      };
      criticalThinking: {
        title: string;
        description: string;
      };
    };
    contribute: {
      title: string;
      description: string;
      github: string;
      documentation: string;
    };
    footer: {
      message: string;
    };
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    close: string;
    save: string;
    remove: string;
    clear: string;
    copy: string;
    share: string;
    yes: string;
    no: string;
    settings: string;
    loadingTitle: string;
    loadingSubtitle: string;
  };
  language: {
    portuguese: string;
    english: string;
    switchTo: string;
  };
  demoTopics: string[];
}

const translations: Record<Language, Translations> = {
  [SUPPORTED_LANGUAGES.PT]: {
    header: {
      title: 'Simulador de Narrativas',
      subtitle: 'Exploração educativa de narrativas jornalísticas',
      generator: 'Gerador',
      history: 'Histórico',
      about: 'Sobre',
      generatorDescription: 'Criar novos artigos',
      historyDescription: 'Ver artigos anteriores',
      aboutDescription: 'Informações do projeto',
      apiConfigured: 'API Configurada',
      apiNotConfigured: 'API Não Configurada',
      configureApi: 'Configurar API',
    },
    generator: {
      title: 'Gerador de Narrativas',
      subtitle: 'Uma ferramenta educativa para explorar diferentes perspectivas jornalísticas e desenvolver pensamento crítico sobre narrativas na mídia.',
      placeholder: 'Ex: Impactos da inteligência artificial na educação',
      generateButton: 'Gerar Notícia',
      newGeneration: 'Nova Geração',
      topicRequired: 'Por favor, insira um tópico.',
      topicTooShort: 'O tópico deve ter pelo menos 3 caracteres.',
      configureApiKey: 'Configure sua chave de API para usar o gerador.',
      trialExhausted: 'Tentativas gratuitas esgotadas. Configure sua chave de API.',
      unexpectedError: 'Erro inesperado. Verifique sua conexão e tente novamente.',
      connectionError: 'Erro ao gerar o artigo. Tente novamente.',
      freeTrialMessage: 'Você tem {count} {count, plural, one {tentativa gratuita} other {tentativas gratuitas}}. Configure sua chave de API para uso ilimitado.',
      freeTrialInfo: 'tentativa gratuita. Configure sua chave de API para uso ilimitado.',
      freeTrialExhausted: 'Tentativas gratuitas esgotadas. Configure sua chave de API para continuar.',
      attempt: 'tentativa',
      attempts: 'tentativas',
      remaining: 'restante',
      free: 'gratuita',
      unlimited: 'ilimitado',
      errorTitle: 'Erro na geração',
      generating: 'Gerando artigo...',
      generatingSubtext: 'Isso pode levar alguns segundos',
      configureApi: 'Configure API',
      unlimitedUsage: 'Uso ilimitado',
      apiKeyRequired: 'Chave API necessária para gerar narrativas',
      poweredBy: 'Desenvolvido com Google Gemini AI',
      unspecifiedTopic: 'Tópico não especificado',
      emptyState: {
        title: 'Comece a explorar narrativas',
        description: 'Digite um tópico de interesse e descubra como diferentes perspectivas podem moldar uma narrativa jornalística.',
        startButton: 'Começar Agora',
      },
    },
    trialCounter: {
      exhausted: 'Tentativas esgotadas',
      remaining: 'restante',
      attempt: 'tentativa',
      attempts: 'tentativas',
      addApiKey: 'Adicionar API Key',
    },
    topicInput: {
      label: 'Tópico para a narrativa',
      placeholder: 'Digite o tema que deseja explorar...',
      placeholderExamples: [
        'Impactos da inteligência artificial na educação',
        'Mudanças climáticas e agricultura sustentável',
        'O futuro do trabalho remoto no Brasil',
        'Tecnologia blockchain na saúde pública',
        'Energias renováveis e desenvolvimento econômico'
      ],
      examples: 'Exemplos',
      generate: 'Gerar',
      generating: 'Gerando...',
      suggestions: 'Sugestões de temas:',
    },
    articleDisplay: {
      generatedAt: 'Gerado em',
      topic: 'Tópico',
      demoMode: 'Modo Demonstração',
      newGeneration: 'Nova Geração',
      copyArticle: 'Copiar Artigo',
      copied: 'Copiado!',
      shareArticle: 'Compartilhar',
      demoMessage: 'Artigo de demonstração - Configure sua API para conteúdo personalizado',
      generatedArticle: 'Artigo Gerado',
      showMore: 'Mostrar mais',
      showLess: 'Mostrar menos',
      copy: 'Copiar',
      share: 'Compartilhar',
      noArticlesYet: 'Nenhum artigo gerado ainda',
      articlesWillAppear: 'Seus artigos aparecerão aqui após a geração',
      generationHistory: 'Histórico de Gerações',
      showingRecent: 'Mostrando os 5 artigos mais recentes',
    },
    configModal: {
      title: 'Configuração da API',
      subtitle: 'Configure sua chave do Google AI Studio para uso ilimitado',
      apiKeyLabel: 'Chave de API do Google AI Studio',
      apiKeyPlaceholder: 'Cole sua chave de API aqui...',
      getApiKey: 'Obter chave no Google AI Studio',
      save: 'Salvar',
      cancel: 'Cancelar',
      remove: 'Remover',
      invalidKey: 'Chave de API inválida',
      saveSuccess: 'Chave de API salva com sucesso',
      removeSuccess: 'Chave de API removida com sucesso',
      instructions: 'Para obter sua chave de API gratuita, visite o Google AI Studio e crie uma nova chave.',
      unlimitedUseTitle: 'Para uso ilimitado:',
      unlimitedUseDescription: 'Configure sua chave de API do Google AI Studio para gerar narrativas sem limites diários.',
      saving: 'Salvando...',
      removeKey: 'Remover Chave',
      saveKey: 'Salvar Chave',
      enterApiKey: 'Por favor, insira uma chave de API.',
      invalidFormat: 'Formato de chave de API inválido.',
      saveError: 'Erro ao salvar a chave de API. Verifique se está correta.',
      unexpectedError: 'Erro inesperado. Tente novamente.',
    },
    history: {
      title: 'Histórico de Gerações',
      subtitle: 'Suas narrativas geradas anteriormente',
      empty: 'Nenhum artigo no histórico',
      emptyDescription: 'Seus artigos gerados aparecerão aqui. Comece criando seu primeiro artigo no gerador.',
      generatedAt: 'Gerado em',
      demoMode: 'Demo',
      remove: 'Remover',
      clear: 'Limpar Tudo',
      confirmClear: 'Tem certeza que deseja limpar todo o histórico?',
      items: 'itens',
      article: 'artigo gerado',
      articles: 'artigos gerados',
      searchPlaceholder: 'Buscar por tópico ou conteúdo...',
      noResults: 'Nenhum resultado encontrado',
      tryOtherTerms: 'Tente buscar por outros termos',
      loadError: 'Erro ao carregar histórico',
      loadErrorDescription: 'Ocorreu um erro ao carregar o histórico. Tente recarregar a página.',
      reload: 'Recarregar',
      deleteArticle: 'Excluir artigo',
      viewArticle: 'Ver Artigo',
      goToGenerator: 'Ir para o Gerador',
    },
    about: {
      title: 'Sobre o Simulador de Narrativas',
      subtitle: 'Uma ferramenta educativa para explorar diferentes perspectivas jornalísticas e desenvolver pensamento crítico sobre narrativas na mídia.',
      mission: {
        title: '🎯 Missão',
        description: 'Capacitar estudantes, jornalistas e educadores com uma ferramenta que demonstra como diferentes perspectivas podem moldar a narrativa de um mesmo evento, promovendo maior consciência sobre viés midiático e literacia digital.',
      },
      howItWorks: {
        title: '🔬 Como Funciona',
        description: 'Utilizando inteligência artificial avançada (Google Gemini), o simulador gera artigos jornalísticos realistas baseados em tópicos fornecidos pelo usuário, sempre mantendo neutralidade e qualidade editorial.',
      },
      features: {
        title: 'Características Principais',
        educational: {
          title: 'Objetivo Educativo',
          description: 'Desenvolver pensamento crítico sobre narrativas jornalísticas e diferentes perspectivas de um mesmo evento.',
        },
        ethics: {
          title: 'Ética e Responsabilidade',
          description: 'Promover o uso responsável da IA na criação de conteúdo, sempre com foco educacional e transparência.',
        },
        creative: {
          title: 'Exploração Criativa',
          description: 'Permitir a exploração de diferentes ângulos jornalísticos de forma segura e controlada.',
        },
      },
      techStack: {
        title: 'Tecnologias Utilizadas',
        react: {
          name: 'React 18',
          description: 'Interface moderna e responsiva',
        },
        typescript: {
          name: 'TypeScript',
          description: 'Tipagem estática para maior segurança',
        },
        tailwind: {
          name: 'TailwindCSS',
          description: 'Design neomórfico e responsivo',
        },
        gemini: {
          name: 'Google Gemini AI',
          description: 'Geração inteligente de narrativas',
        },
        zustand: {
          name: 'Zustand',
          description: 'Gerenciamento de estado eficiente',
        },
      },
      responsibleUse: {
        title: 'Uso Responsável',
        educational: {
          title: 'Finalidade Educativa',
          description: 'Esta ferramenta foi criada exclusivamente para fins educacionais e de pesquisa.',
        },
        transparency: {
          title: 'Transparência',
          description: 'Todo conteúdo gerado é claramente identificado como criado por IA.',
        },
        noPublication: {
          title: 'Não Publicação',
          description: 'O conteúdo não deve ser usado como notícia real ou publicado sem contexto adequado.',
        },
        criticalThinking: {
          title: 'Pensamento Crítico',
          description: 'Incentivamos sempre a verificação de fontes e análise crítica de qualquer narrativa.',
        },
      },
      contribute: {
        title: 'Contribua com o Projeto',
        description: 'Este é um projeto open-source desenvolvido com o objetivo de promover educação e literacia midiática. Sua contribuição é bem-vinda!',
        github: 'Ver no GitHub',
        documentation: 'Documentação',
      },
      footer: {
        message: 'Desenvolvido com propósito educativo',
      },
    },
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      close: 'Fechar',
      save: 'Salvar',
      remove: 'Remover',
      clear: 'Limpar',
      copy: 'Copiar',
      share: 'Compartilhar',
      yes: 'Sim',
      no: 'Não',
      settings: 'Configurações',
      loadingTitle: 'Carregando...',
      loadingSubtitle: 'Preparando o simulador de narrativas',
    },
    language: {
      portuguese: 'Português',
      english: 'English',
      switchTo: 'Mudar para',
    },
    demoTopics: [
      'Descoberta de uma nova cor primária',
      'Cientistas confirmam que plantas podem fazer fotossíntese no escuro',
      'Arqueólogos encontram evidências de que dinossauros usavam ferramentas',
      'Físicos descobrem que a gravidade funciona ao contrário às quintas-feiras',
      'Pesquisadores comprovam que gatos domésticos são alienígenas disfarçados',
      'Biólogos descobrem que árvores se comunicam através de redes sociais',
      'Matemáticos provam que 2+2 pode ser igual a 5 em certas condições',
      'Oceanógrafos encontram civilização perdida no fundo do oceano',
      'Astrônomos detectam planeta feito inteiramente de chocolate',
      'Linguistas descobrem idioma universal falado por todos os animais',
      'Geólogos confirmam que montanhas crescem durante a lua cheia',
      'Neurocientistas descobrem que sonhos podem ser baixados como arquivos',
      'Químicos criam elemento que torna objetos invisíveis',
      'Antropólogos encontram evidências de que humanos antigos voavam',
      'Meteorologistas descobrem como controlar o clima com música clássica',
      'Botânicos criam plantas que produzem energia elétrica',
      'Zoólogos descobrem que pinguins são na verdade robôs da natureza',
      'Físicos quânticos provam que o tempo anda para trás aos domingos',
      'Arqueólogos descobrem biblioteca com livros do futuro',
      'Biólogos marinhos encontram peixes que falam 12 idiomas',
      'Engenheiros criam máquina que transforma pensamentos em realidade',
      'Psicólogos descobrem que rir por 10 minutos equivale a 2 horas de exercício',
      'Historiadores encontram evidências de que pirâmides eram estações espaciais',
      'Cientistas da computação criam IA que resolve problemas dormindo',
      'Ecologistas descobrem floresta que se move 50km por ano',
      'Médicos descobrem que cantar ópera cura resfriados instantaneamente',
      'Engenheiros desenvolvem ponte que se constrói sozinha',
      'Paleontólogos descobrem que dinossauros tinham redes sociais primitivas',
      'Físicos criam portal que conecta geladeiras do mundo todo',
      'Sociólogos descobrem que sociedades funcionam melhor com música ambiente'
    ],
  },
  [SUPPORTED_LANGUAGES.EN]: {
    header: {
      title: 'Narrative Simulator',
      subtitle: 'Educational exploration of journalistic narratives',
      generator: 'Generator',
      history: 'History',
      about: 'About',
      generatorDescription: 'Create new articles',
      historyDescription: 'View previous articles',
      aboutDescription: 'Project information',
      apiConfigured: 'API Configured',
      apiNotConfigured: 'API Not Configured',
      configureApi: 'Configure API',
    },
    generator: {
      title: 'Narrative Generator',
      subtitle: 'An educational tool to explore different journalistic perspectives and develop critical thinking about media narratives.',
      placeholder: 'Ex: Impacts of artificial intelligence on education',
      generateButton: 'Generate News',
      newGeneration: 'New Generation',
      topicRequired: 'Please enter a topic.',
      topicTooShort: 'Topic must be at least 3 characters long.',
      configureApiKey: 'Configure your API key to use the generator.',
      trialExhausted: 'Free attempts exhausted. Configure your API key.',
      unexpectedError: 'Unexpected error. Check your connection and try again.',
      connectionError: 'Error generating article. Please try again.',
      freeTrialMessage: 'You have {count} {count, plural, one {free attempt} other {free attempts}}. Configure your API key for unlimited usage.',
      freeTrialInfo: 'free attempt. Configure your API key for unlimited use.',
      freeTrialExhausted: 'Free attempts exhausted. Configure your API key to continue.',
      attempt: 'attempt',
      attempts: 'attempts',
      remaining: 'remaining',
      free: 'free',
      unlimited: 'unlimited',
      errorTitle: 'Generation Error',
      generating: 'Generating article...',
      generatingSubtext: 'This may take a few seconds',
      configureApi: 'Configure API',
      unlimitedUsage: 'Unlimited usage',
      apiKeyRequired: 'API key required to generate narratives',
      poweredBy: 'Powered by Google Gemini AI',
      unspecifiedTopic: 'Topic not specified',
      emptyState: {
        title: 'Start exploring narratives',
        description: 'Enter a topic of interest and discover how different perspectives can shape a journalistic narrative.',
        startButton: 'Get Started',
      },
    },
    trialCounter: {
      exhausted: 'Attempts exhausted',
      remaining: 'remaining',
      attempt: 'attempt',
      attempts: 'attempts',
      addApiKey: 'Add API Key',
    },
    topicInput: {
      label: 'Topic for the narrative',
      placeholder: 'Enter the topic you want to explore...',
      placeholderExamples: [
        'Impacts of artificial intelligence on education',
        'Climate change and sustainable agriculture',
        'The future of remote work in modern society',
        'Blockchain technology in public healthcare',
        'Renewable energy and economic development'
      ],
      examples: 'Examples',
      generate: 'Generate',
      generating: 'Generating...',
      suggestions: 'Topic suggestions:',
    },
    articleDisplay: {
      generatedAt: 'Generated at',
      topic: 'Topic',
      demoMode: 'Demo Mode',
      newGeneration: 'New Generation',
      copyArticle: 'Copy Article',
      copied: 'Copied!',
      shareArticle: 'Share',
      demoMessage: 'Demo article - Configure your API for personalized content',
      generatedArticle: 'Generated Article',
      showMore: 'Show more',
      showLess: 'Show less',
      copy: 'Copy',
      share: 'Share',
      noArticlesYet: 'No articles generated yet',
      articlesWillAppear: 'Your articles will appear here after generation',
      generationHistory: 'Generation History',
      showingRecent: 'Showing the 5 most recent articles',
    },
    configModal: {
      title: 'API Configuration',
      subtitle: 'Configure your Google AI Studio key for unlimited use',
      apiKeyLabel: 'Google AI Studio API Key',
      apiKeyPlaceholder: 'Paste your API key here...',
      getApiKey: 'Get key at Google AI Studio',
      save: 'Save',
      cancel: 'Cancel',
      remove: 'Remove',
      invalidKey: 'Invalid API key',
      saveSuccess: 'API key saved successfully',
      removeSuccess: 'API key removed successfully',
      instructions: 'To get your free API key, visit Google AI Studio and create a new key.',
      unlimitedUseTitle: 'For unlimited use:',
      unlimitedUseDescription: 'Configure your Google AI Studio API key to generate narratives without daily limits.',
      saving: 'Saving...',
      removeKey: 'Remove Key',
      saveKey: 'Save Key',
      enterApiKey: 'Please enter an API key.',
      invalidFormat: 'Invalid API key format.',
      saveError: 'Error saving API key. Please check if it is correct.',
      unexpectedError: 'Unexpected error. Please try again.',
    },
    history: {
      title: 'Generation History',
      subtitle: 'Your previously generated narratives',
      empty: 'No articles in history',
      emptyDescription: 'Your generated articles will appear here. Start by creating your first article in the generator.',
      generatedAt: 'Generated at',
      demoMode: 'Demo',
      remove: 'Remove',
      clear: 'Clear All',
      confirmClear: 'Are you sure you want to clear all history?',
      items: 'items',
      article: 'generated article',
      articles: 'generated articles',
      searchPlaceholder: 'Search by topic or content...',
      noResults: 'No results found',
      tryOtherTerms: 'Try searching for other terms',
      loadError: 'Error loading history',
      loadErrorDescription: 'An error occurred while loading the history. Try reloading the page.',
      reload: 'Reload',
      deleteArticle: 'Delete article',
      viewArticle: 'View Article',
      goToGenerator: 'Go to Generator',
    },
    about: {
      title: 'About the Narrative Simulator',
      subtitle: 'An educational tool to explore different journalistic perspectives and develop critical thinking about media narratives.',
      mission: {
        title: '🎯 Mission',
        description: 'Empower students, journalists and educators with a tool that demonstrates how different perspectives can shape the narrative of the same event, promoting greater awareness of media bias and digital literacy.',
      },
      howItWorks: {
        title: '🔬 How It Works',
        description: 'Using advanced artificial intelligence (Google Gemini), the simulator generates realistic journalistic articles based on topics provided by the user, always maintaining neutrality and editorial quality.',
      },
      features: {
        title: 'Key Features',
        educational: {
          title: 'Educational Objective',
          description: 'Develop critical thinking about journalistic narratives and different perspectives on the same event.',
        },
        ethics: {
          title: 'Ethics and Responsibility',
          description: 'Promote responsible use of AI in content creation, always with educational focus and transparency.',
        },
        creative: {
          title: 'Creative Exploration',
          description: 'Allow exploration of different journalistic angles in a safe and controlled manner.',
        },
      },
      techStack: {
        title: 'Technologies Used',
        react: {
          name: 'React 18',
          description: 'Modern and responsive interface',
        },
        typescript: {
          name: 'TypeScript',
          description: 'Static typing for greater security',
        },
        tailwind: {
          name: 'TailwindCSS',
          description: 'Neumorphic and responsive design',
        },
        gemini: {
          name: 'Google Gemini AI',
          description: 'Intelligent narrative generation',
        },
        zustand: {
          name: 'Zustand',
          description: 'Efficient state management',
        },
      },
      responsibleUse: {
        title: 'Responsible Use',
        educational: {
          title: 'Educational Purpose',
          description: 'This tool was created exclusively for educational and research purposes.',
        },
        transparency: {
          title: 'Transparency',
          description: 'All generated content is clearly identified as AI-created.',
        },
        noPublication: {
          title: 'No Publication',
          description: 'Content should not be used as real news or published without proper context.',
        },
        criticalThinking: {
          title: 'Critical Thinking',
          description: 'We always encourage source verification and critical analysis of any narrative.',
        },
      },
      contribute: {
        title: 'Contribute to the Project',
        description: 'This is an open-source project developed with the goal of promoting education and media literacy. Your contribution is welcome!',
        github: 'View on GitHub',
        documentation: 'Documentation',
      },
      footer: {
        message: 'Developed with educational purpose',
      },
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      save: 'Save',
      remove: 'Remove',
      clear: 'Clear',
      copy: 'Copy',
      share: 'Share',
      yes: 'Yes',
      no: 'No',
      settings: 'Settings',
      loadingTitle: 'Loading...',
      loadingSubtitle: 'Preparing the narrative simulator',
    },
    language: {
      portuguese: 'Português',
      english: 'English',
      switchTo: 'Switch to',
    },
    demoTopics: [
      'Discovery of a new primary color',
      'Scientists confirm plants can photosynthesize in the dark',
      'Archaeologists find evidence that dinosaurs used tools',
      'Physicists discover gravity works backwards on Thursdays',
      'Researchers prove domestic cats are disguised aliens',
      'Biologists discover trees communicate through social networks',
      'Mathematicians prove 2+2 can equal 5 under certain conditions',
      'Oceanographers find lost civilization at ocean bottom',
      'Astronomers detect planet made entirely of chocolate',
      'Linguists discover universal language spoken by all animals',
      'Geologists confirm mountains grow during full moon',
      'Neuroscientists discover dreams can be downloaded as files',
      'Chemists create element that makes objects invisible',
      'Anthropologists find evidence ancient humans could fly',
      'Meteorologists discover how to control weather with classical music',
      'Botanists create plants that produce electrical energy',
      'Zoologists discover penguins are actually nature\'s robots',
      'Quantum physicists prove time runs backwards on Sundays',
      'Archaeologists discover library with books from the future',
      'Marine biologists find fish that speak 12 languages',
      'Engineers create machine that transforms thoughts into reality',
      'Psychologists discover laughing for 10 minutes equals 2 hours of exercise',
      'Historians find evidence pyramids were space stations',
      'Computer scientists create AI that solves problems while sleeping',
      'Ecologists discover forest that moves 50km per year',
      'Doctors discover singing opera instantly cures colds',
      'Engineers develop bridge that builds itself',
      'Paleontologists discover dinosaurs had primitive social networks',
      'Physicists create portal connecting refrigerators worldwide',
      'Sociologists discover societies work better with ambient music'
    ],
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language] || translations[SUPPORTED_LANGUAGES.PT];
}

export { translations };