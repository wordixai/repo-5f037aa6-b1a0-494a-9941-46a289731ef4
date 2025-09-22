import { useRef } from 'react';
import { Component } from '../AppBuilder';
import { CanvasComponent } from './CanvasComponent';

interface BuilderCanvasProps {
  components: Component[];
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
  onAddComponent: (type: string, position: { x: number; y: number }) => void;
}

export function BuilderCanvas({ 
  components, 
  selectedComponent, 
  onSelectComponent, 
  onUpdateComponent,
  onAddComponent 
}: BuilderCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      onAddComponent(componentType, position);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 relative bg-gray-900">
      <div
        ref={canvasRef}
        className="absolute inset-0 overflow-auto"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onSelectComponent('');
          }
        }}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #374151 1px, transparent 1px),
              linear-gradient(to bottom, #374151 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Drop zone indicator */}
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                <span className="text-2xl">+</span>
              </div>
              <p className="text-lg font-medium">Drop components here</p>
              <p className="text-sm opacity-75">or click components from the sidebar</p>
            </div>
          </div>
        )}

        {/* Render components */}
        {components.map((component) => (
          <CanvasComponent
            key={component.id}
            component={component}
            isSelected={selectedComponent === component.id}
            onSelect={() => onSelectComponent(component.id)}
            onUpdate={(updates) => onUpdateComponent(component.id, updates)}
          />
        ))}
      </div>
    </div>
  );
}