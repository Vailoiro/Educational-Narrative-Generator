import { BookOpen, Target, Shield, Lightbulb, ExternalLink, Github, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { PulseButton } from '../components/GenerateButton';

export function AboutPage() {
  const features = [
    {
      icon: Target,
      title: 'Objetivo Educativo',
      description: 'Desenvolver pensamento crítico sobre narrativas jornalísticas e diferentes perspectivas de um mesmo evento.'
    },
    {
      icon: Shield,
      title: 'Ética e Responsabilidade',
      description: 'Promover o uso responsável da IA na criação de conteúdo, sempre com foco educacional e transparência.'
    },
    {
      icon: Lightbulb,
      title: 'Exploração Criativa',
      description: 'Permitir a exploração de diferentes ângulos jornalísticos de forma segura e controlada.'
    }
  ];

  const techStack = [
    { name: 'React 18', description: 'Interface moderna e responsiva' },
    { name: 'TypeScript', description: 'Tipagem estática para maior segurança' },
    { name: 'TailwindCSS', description: 'Design neomórfico e responsivo' },
    { name: 'Google Gemini AI', description: 'Geração inteligente de narrativas' },
    { name: 'Zustand', description: 'Gerenciamento de estado eficiente' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <div className={cn(
          "w-16 h-16 mx-auto mb-6 rounded-2xl",
          "bg-gradient-to-br from-primary to-primary/80",
          "flex items-center justify-center",
          "shadow-neumorphic animate-pulse-ring"
        )}>
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        
        <h1 className={cn(
          "font-display font-bold text-3xl mb-4",
          "bg-gradient-to-r from-foreground to-foreground/80",
          "bg-clip-text text-transparent"
        )}>
          Sobre o Simulador de Narrativas
        </h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Uma ferramenta educativa para explorar diferentes perspectivas jornalísticas 
          e desenvolver pensamento crítico sobre narrativas na mídia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card-neumorphic">
          <h2 className="font-display font-semibold text-xl text-foreground mb-4">
            🎯 Missão
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Capacitar estudantes, jornalistas e educadores com uma ferramenta que demonstra 
            como diferentes perspectivas podem moldar a narrativa de um mesmo evento, 
            promovendo maior consciência sobre viés midiático e literacia digital.
          </p>
        </div>

        <div className="card-neumorphic">
          <h2 className="font-display font-semibold text-xl text-foreground mb-4">
            🔬 Como Funciona
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Utilizando inteligência artificial avançada (Google Gemini), o simulador 
            gera artigos jornalísticos realistas baseados em tópicos fornecidos pelo usuário, 
            sempre mantendo neutralidade e qualidade editorial.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
          Características Principais
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card-neumorphic text-center">
                <div className={cn(
                  "w-12 h-12 mx-auto mb-4 rounded-xl",
                  "bg-primary/10 flex items-center justify-center"
                )}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
          Tecnologias Utilizadas
        </h2>
        
        <div className="card-neumorphic">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg",
                "bg-muted/20 border border-muted/30",
                "hover:bg-muted/30 transition-colors"
              )}>
                <h4 className="font-medium text-foreground mb-1">
                  {tech.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
          Uso Responsável
        </h2>
        
        <div className="card-neumorphic">
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Finalidade Educativa:</strong> 
                Esta ferramenta foi criada exclusivamente para fins educacionais e de pesquisa.
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Transparência:</strong> 
                Todo conteúdo gerado é claramente identificado como criado por IA.
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Não Publicação:</strong> 
                O conteúdo não deve ser usado como notícia real ou publicado sem contexto adequado.
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">Pensamento Crítico:</strong> 
                Incentivamos sempre a verificação de fontes e análise crítica de qualquer narrativa.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
          Contribua com o Projeto
        </h2>
        
        <div className="card-neumorphic">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Este é um projeto open-source desenvolvido com o objetivo de promover 
            educação e literacia midiática. Sua contribuição é bem-vinda!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <PulseButton
              onClick={() => window.open('https://github.com', '_blank')}
              className="flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>Ver no GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </PulseButton>
            
            <PulseButton
              onClick={() => window.open('https://docs.google.com', '_blank')}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Documentação</span>
              <ExternalLink className="w-3 h-3" />
            </PulseButton>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className={cn(
          "inline-flex items-center space-x-2 px-4 py-2 rounded-lg",
          "bg-muted/20 border border-muted/30",
          "text-sm text-muted-foreground"
        )}>
          <Heart className="w-4 h-4 text-red-500" />
          <span>Desenvolvido com propósito educativo</span>
        </div>
      </div>
    </div>
  );
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  className 
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("card-neumorphic text-center", className)}>
      <div className={cn(
        "w-12 h-12 mx-auto mb-4 rounded-xl",
        "bg-primary/10 flex items-center justify-center"
      )}>
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="font-medium text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function TechBadge({ 
  name, 
  description 
}: { 
  name: string; 
  description: string; 
}) {
  return (
    <div className={cn(
      "p-4 rounded-lg",
      "bg-muted/20 border border-muted/30",
      "hover:bg-muted/30 transition-colors"
    )}>
      <h4 className="font-medium text-foreground mb-1">
        {name}
      </h4>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}