import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Component } from '../AppBuilder';
import { Eye, EyeOff, Trash2, Square } from 'lucide-react';

interface ComponentTreeProps {
  components: Component[];
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
}

export function ComponentTree({ 
  components, 
  selectedComponent, 
  onSelectComponent, 
  onDeleteComponent 
}: ComponentTreeProps) {
  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-1">
        {components.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Square className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No components added yet</p>
          </div>
        ) : (
          components.map((component) => (
            <div
              key={component.id}
              className={`flex items-center justify-between p-2 rounded-lg border transition-colors cursor-pointer ${
                selectedComponent === component.id
                  ? 'bg-builder-accent border-builder-accent text-white'
                  : 'border-gray-700 hover:bg-gray-800 hover:border-gray-600'
              }`}
              onClick={() => onSelectComponent(component.id)}
            >
              <div className="flex items-center space-x-2 flex-1">
                <Square className="w-4 h-4" />
                <span className="text-sm capitalize">{component.type}</span>
                <span className="text-xs text-gray-500">#{component.id.split('-')[1]}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 hover:bg-gray-700"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteComponent(component.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}