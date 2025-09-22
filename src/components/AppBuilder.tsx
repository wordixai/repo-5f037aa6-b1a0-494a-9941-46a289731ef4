import { useState } from 'react';
import { BuilderSidebar } from './builder/BuilderSidebar';
import { BuilderCanvas } from './builder/BuilderCanvas';
import { BuilderPreview } from './builder/BuilderPreview';
import { BuilderToolbar } from './builder/BuilderToolbar';
import { ComponentPanel } from './builder/ComponentPanel';
import { CodePanel } from './builder/CodePanel';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface AppBuilderProps {
  onBack: () => void;
}

export interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  position: { x: number; y: number };
}

export function AppBuilder({ onBack }: AppBuilderProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [mode, setMode] = useState<'design' | 'preview' | 'code'>('design');

  const addComponent = (type: string, position: { x: number; y: number }) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      position,
    };
    
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const getDefaultProps = (type: string): Record<string, any> => {
    switch (type) {
      case 'button':
        return { text: 'Click me', variant: 'default', size: 'default' };
      case 'text':
        return { content: 'Sample text', size: 'base', weight: 'normal' };
      case 'input':
        return { placeholder: 'Enter text...', type: 'text' };
      case 'card':
        return { title: 'Card Title', description: 'Card description' };
      case 'image':
        return { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', alt: 'Sample image' };
      default:
        return {};
    }
  };

  return (
    <div className="h-screen bg-builder-bg text-white flex flex-col">
      {/* Top Bar */}
      <div className="h-14 bg-builder-panel border-b border-gray-800 flex items-center px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-400 hover:text-white mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex-1">
          <h1 className="text-lg font-semibold">App Builder</h1>
        </div>

        <BuilderToolbar mode={mode} onModeChange={setMode} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-builder-panel border-r border-gray-800 flex flex-col">
          <BuilderSidebar 
            onAddComponent={addComponent}
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onDeleteComponent={deleteComponent}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {mode === 'design' && (
            <BuilderCanvas
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              onUpdateComponent={updateComponent}
              onAddComponent={addComponent}
            />
          )}
          
          {mode === 'preview' && (
            <BuilderPreview components={components} />
          )}
          
          {mode === 'code' && (
            <CodePanel components={components} />
          )}
        </div>

        {/* Right Panel */}
        {mode === 'design' && selectedComponent && (
          <div className="w-80 bg-builder-panel border-l border-gray-800">
            <ComponentPanel
              component={components.find(c => c.id === selectedComponent)!}
              onUpdate={(updates) => updateComponent(selectedComponent, updates)}
            />
          </div>
        )}
      </div>
    </div>
  );
}