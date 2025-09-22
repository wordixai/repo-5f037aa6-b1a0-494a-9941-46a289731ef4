import { Component } from '../AppBuilder';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

interface BuilderPreviewProps {
  components: Component[];
}

export function BuilderPreview({ components }: BuilderPreviewProps) {
  const renderComponent = (component: Component) => {
    switch (component.type) {
      case 'button':
        return (
          <Button 
            key={component.id}
            variant={component.props.variant} 
            size={component.props.size}
          >
            {component.props.text}
          </Button>
        );
      
      case 'text':
        return (
          <p 
            key={component.id}
            className={`text-${component.props.size} font-${component.props.weight} text-gray-900`}
          >
            {component.props.content}
          </p>
        );
      
      case 'input':
        return (
          <Input 
            key={component.id}
            placeholder={component.props.placeholder}
            type={component.props.type}
          />
        );
      
      case 'card':
        return (
          <Card key={component.id} className="min-w-[300px]">
            <CardHeader>
              <CardTitle>{component.props.title}</CardTitle>
              <CardDescription>{component.props.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
          </Card>
        );
      
      case 'image':
        return (
          <img 
            key={component.id}
            src={component.props.src}
            alt={component.props.alt}
            className="max-w-[300px] max-h-[200px] object-cover rounded"
          />
        );
      
      default:
        return (
          <div key={component.id} className="p-4 bg-gray-100 rounded border-2 border-dashed border-gray-300">
            <span className="text-sm text-gray-600">{component.type}</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-white">
      <div className="h-full overflow-auto p-8">
        {components.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No components to preview</h3>
              <p>Add some components to see the preview</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {components.map(renderComponent)}
          </div>
        )}
      </div>
    </div>
  );
}