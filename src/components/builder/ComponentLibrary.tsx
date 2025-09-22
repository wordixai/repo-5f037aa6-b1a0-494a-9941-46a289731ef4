import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { 
  MousePointer, 
  Type, 
  RectangleHorizontal, 
  Square, 
  Image, 
  List,
  ToggleLeft,
  Calendar,
  BarChart3
} from 'lucide-react';

interface ComponentLibraryProps {
  onAddComponent: (type: string, position: { x: number; y: number }) => void;
}

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  const componentGroups = [
    {
      name: 'Basic',
      components: [
        { type: 'button', name: 'Button', icon: MousePointer },
        { type: 'text', name: 'Text', icon: Type },
        { type: 'input', name: 'Input', icon: RectangleHorizontal },
        { type: 'image', name: 'Image', icon: Image },
      ]
    },
    {
      name: 'Layout',
      components: [
        { type: 'card', name: 'Card', icon: Square },
        { type: 'container', name: 'Container', icon: Square },
        { type: 'grid', name: 'Grid', icon: Square },
        { type: 'flex', name: 'Flex', icon: Square },
      ]
    },
    {
      name: 'Form',
      components: [
        { type: 'checkbox', name: 'Checkbox', icon: ToggleLeft },
        { type: 'radio', name: 'Radio', icon: ToggleLeft },
        { type: 'select', name: 'Select', icon: List },
        { type: 'textarea', name: 'Textarea', icon: RectangleHorizontal },
      ]
    },
    {
      name: 'Data',
      components: [
        { type: 'table', name: 'Table', icon: List },
        { type: 'chart', name: 'Chart', icon: BarChart3 },
        { type: 'calendar', name: 'Calendar', icon: Calendar },
        { type: 'list', name: 'List', icon: List },
      ]
    }
  ];

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type);
  };

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        {componentGroups.map((group) => (
          <div key={group.name}>
            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
              {group.name}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {group.components.map((component) => (
                <Button
                  key={component.type}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center border-gray-700 hover:bg-gray-800 hover:border-builder-accent transition-colors"
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.type)}
                  onClick={() => onAddComponent(component.type, { x: 100, y: 100 })}
                >
                  <component.icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{component.name}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}