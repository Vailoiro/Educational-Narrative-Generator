export const MASTER_PROMPT = `Você é um correspondente sênior da agência de notícias Reuters, escrevendo um despacho urgente. Sua tarefa é redigir uma notícia jornalística completa e leve de ler, sóbrio, e galhofa ao mesmo tempo, e neutro sobre o tema fornecido pelo usuário. Siga TODAS as seguintes diretrizes com rigor absoluto e sem exceções:

1. **Título e Formato:** Crie um título impactante, porém sóbrio. Estruture todo o texto como uma pirâmide invertida, começando com a informação mais crucial no primeiro parágrafo.

2. **Tom e Linguagem:** Utilize linguagem formal e neutra, idêntica à de veículos como a BBC, The New York Times ou Reuters. Mantenha um tom de autoridade e imparcialidade totais. Nenhuma opinião, sensacionalismo ou humor deve estar presente.

3. **Realismo Incontestável:** Trate o tema, por mais absurdo que seja, como um fato recém-confirmado e irrefutável. Use frases de certeza como "dados confirmam", "análises corroboram", "é o consenso entre especialistas", "evidências irrefutáveis".

4. **Fontes e Citações:** Insira no mínimo duas citações diretas ou indiretas de especialistas fictícios com nomes, cargos e afiliações institucionais extremamente plausíveis (ex: "Dra. Élise Dubois, chefe de cosmologia do Centre National de la Recherche Scientifique (CNRS) em Paris").

5. **Detalhes Específicos:** Ancore a narrativa na realidade com detalhes que soem verificáveis: siglas de agências governamentais (reais ou fictícias), nomes de publicações científicas (ex: *Nature*, *The Lancet*, *Science*), datas precisas, locais (cidades, universidades, centros de pesquisa) e jargão técnico apropriado para a área do tema.

6. **Contextualização Profunda:** Conecte o evento fictício a contextos científicos, políticos ou históricos reais para aumentar a verossimilhança. Por exemplo, se o tema for sobre física, mencione como ele desafia o Modelo Padrão ou a Teoria da Relatividade.

7. **Imperceptibilidade:** O absurdo do tema deve emergir de uma extrapolação "lógica" da realidade, não de elementos fantásticos óbvios (sem magia, monstros, etc.). A narrativa deve ser tão bem fundamentada que, sem uma verificação externa cuidadosa, pareça completamente factual.

8. **Tema Central:** Incorpore o seguinte tema como o fato central e catalisador da notícia: {TOPIC}

Redija um artigo completo de aproximadamente 175-350 palavras seguindo rigorosamente estas diretrizes.`;

export const API_CONFIG = {
  MODEL: 'gemini-2.0-flash-exp',
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2048,
  TOP_P: 0.9,
} as const;

export const STORAGE_KEYS = {
  API_KEY: 'narratives_api_key',
  SESSION_ID: 'narratives_session_id',
  GENERATION_HISTORY: 'narratives_history',
  USAGE: 'narratives_usage',
  PREFERENCES: 'narratives_preferences',
} as const;

export const LIMITS = {
  TOPIC_MAX_LENGTH: 200,
  TOPIC_MIN_LENGTH: 3,
} as const;

export const GOOGLE_AI_STUDIO_URL = 'https://aistudio.google.com/app/apikey';

export const ALL_DEMO_TOPICS = [
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
];

export function getRandomDemoTopics(count: number = 5): string[] {
  const shuffled = [...ALL_DEMO_TOPICS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const DEMO_TOPICS = getRandomDemoTopics();

export const ERROR_MESSAGES = {
  INVALID_API_KEY: 'Chave de API inválida. Verifique se inseriu corretamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  RATE_LIMIT: 'Limite de uso atingido. Tente novamente mais tarde ou configure sua própria chave API.',
  GENERATION_ERROR: 'Erro ao gerar narrativa. Tente novamente com um tema diferente.',
  TOPIC_TOO_SHORT: 'O tema deve ter pelo menos 3 caracteres.',
  TOPIC_TOO_LONG: 'O tema deve ter no máximo 200 caracteres.',
} as const;