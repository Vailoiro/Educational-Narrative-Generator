import { getTranslations, SUPPORTED_LANGUAGES, Language } from './translations';

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
  LANGUAGE: 'narratives_language',
} as const;

export const LIMITS = {
  TOPIC_MAX_LENGTH: 200,
  TOPIC_MIN_LENGTH: 3,
} as const;

export const GOOGLE_AI_STUDIO_URL = 'https://aistudio.google.com/app/apikey';

export function getRandomDemoTopics(count: number = 5, language: Language = SUPPORTED_LANGUAGES.PT): string[] {
  const translations = getTranslations(language);
  const topics = translations.demoTopics;
  const shuffled = [...topics].sort(() => Math.random() - 0.5);
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