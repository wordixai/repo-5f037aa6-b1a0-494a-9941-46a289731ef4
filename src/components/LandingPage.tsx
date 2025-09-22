import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code, Zap, Palette, Download, Github, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Code,
      title: 'Visual Code Builder',
      description: 'Drag and drop components to build your app visually with instant code generation.'
    },
    {
      icon: Zap,
      title: 'Real-time Preview',
      description: 'See your changes instantly with hot reload and live preview functionality.'
    },
    {
      icon: Palette,
      title: 'Beautiful Templates',
      description: 'Start with professionally designed templates and customize them to your needs.'
    },
    {
      icon: Download,
      title: 'Export Anywhere',
      description: 'Export clean, production-ready code that you can deploy anywhere.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 builder-gradient rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">AppBuilder</span>
          </div>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Visual App Builder
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Build Apps
            <br />
            Visually
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create beautiful, responsive applications with our drag-and-drop interface. 
            Generate clean, production-ready code instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="builder-gradient text-white border-0 px-8 py-6 text-lg font-semibold animate-pulse-glow"
            >
              Start Building Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to build amazing apps
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powerful features that make app development fast, fun, and accessible to everyone.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-12 h-12 builder-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="builder-gradient border-0 text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start building?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers creating amazing apps with our visual builder.
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg" 
              variant="secondary"
              className="px-8 py-6 text-lg font-semibold"
            >
              Get Started for Free
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 AppBuilder. Made with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  );
}