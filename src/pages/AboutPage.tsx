import { BookOpen, Target, Shield, Lightbulb, ExternalLink, Github, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { PulseButton } from '../components/GenerateButton';
import { useTranslation } from '../hooks/useTranslation';

export function AboutPage() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Target,
      title: t('about.features.educational.title'),
      description: t('about.features.educational.description')
    },
    {
      icon: Shield,
      title: t('about.features.ethics.title'),
      description: t('about.features.ethics.description')
    },
    {
      icon: Lightbulb,
      title: t('about.features.creative.title'),
      description: t('about.features.creative.description')
    }
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
          {t('about.title')}
        </h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card-neumorphic">
          <h2 className="font-display font-semibold text-xl text-foreground mb-4">
            {t('about.mission.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.mission.description')}
          </p>
        </div>

        <div className="card-neumorphic">
          <h2 className="font-display font-semibold text-xl text-foreground mb-4">
            {t('about.howItWorks.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.howItWorks.description')}
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
          {t('about.features.title')}
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
          {t('about.techStack.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: t('about.techStack.react.name'), desc: t('about.techStack.react.description'), icon: '⚛️' },
            { name: t('about.techStack.typescript.name'), desc: t('about.techStack.typescript.description'), icon: '📘' },
            { name: t('about.techStack.tailwind.name'), desc: t('about.techStack.tailwind.description'), icon: '🎨' },
            { name: t('about.techStack.gemini.name'), desc: t('about.techStack.gemini.description'), icon: '🤖' },
            { name: t('about.techStack.zustand.name'), desc: t('about.techStack.zustand.description'), icon: '🗃️' },
          ].map((tech, index) => (
            <div key={index} className="card-neumorphic text-center">
              <div className="text-3xl mb-3">{tech.icon}</div>
              <h3 className="font-display font-medium text-foreground mb-2">{tech.name}</h3>
              <p className="text-muted-foreground text-sm">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
          {t('about.responsibleUse.title')}
        </h2>
        
        <div className="card-neumorphic">
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">{t('about.responsibleUse.educational.title')}:</strong> 
                {t('about.responsibleUse.educational.description')}
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">{t('about.responsibleUse.transparency.title')}:</strong> 
                {t('about.responsibleUse.transparency.description')}
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">{t('about.responsibleUse.noPublication.title')}:</strong> 
                {t('about.responsibleUse.noPublication.description')}
              </p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p>
                <strong className="text-foreground">{t('about.responsibleUse.criticalThinking.title')}:</strong> 
                {t('about.responsibleUse.criticalThinking.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
          {t('about.contribute.title')}
        </h2>
        
        <div className="card-neumorphic">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {t('about.contribute.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <PulseButton
              onClick={() => window.open('https://github.com/Vailoiro/Educational-Narrative-Generator', '_blank')}
              className="flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>{t('about.contribute.github')}</span>
              <ExternalLink className="w-3 h-3" />
            </PulseButton>
            
            <PulseButton
              onClick={() => window.open('https://github.com/Vailoiro/Educational-Narrative-Generator/blob/main/README.md', '_blank')}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('about.contribute.documentation')}</span>
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
          <span>{t('about.footer.message')}</span>
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