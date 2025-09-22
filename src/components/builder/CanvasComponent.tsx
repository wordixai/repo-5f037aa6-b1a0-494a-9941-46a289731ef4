import { useState, useRef } from 'react';
import { Component } from '../AppBuilder';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

interface CanvasComponentProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Component>) => void;
}

export function CanvasComponent({ component, isSelected, onSelect, onUpdate }: CanvasComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== componentRef.current) return;
    
    setIsDragging(true);
    const rect = componentRef.current!.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onSelect();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const canvas = componentRef.current!.offsetParent as HTMLElement;
    const canvasRect = canvas.getBoundingClientRect();
    
    const newPosition = {
      x: e.clientX - canvasRect.left - dragOffset.x,
      y: e.clientY - canvasRect.top - dragOffset.y
    };
    
    onUpdate({ position: newPosition });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'button':
        return (
          <Button 
            variant={component.props.variant} 
            size={component.props.size}
            className="pointer-events-none"
          >
            {component.props.text}
          </Button>
        );
      
      case 'text':
        return (
          <p 
            className={`pointer-events-none text-${component.props.size} font-${component.props.weight}`}
          >
            {component.props.content}
          </p>
        );
      
      case 'input':
        return (
          <Input 
            placeholder={component.props.placeholder}
            type={component.props.type}
            className="pointer-events-none"
          />
        );
      
      case 'card':
        return (
          <Card className="pointer-events-none min-w-[200px]">
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
            src={component.props.src}
            alt={component.props.alt}
            className="pointer-events-none max-w-[200px] max-h-[150px] object-cover rounded"
          />
        );
      
      default:
        return (
          <div className="p-4 bg-gray-700 rounded border-2 border-dashed border-gray-600 pointer-events-none">
            <span className="text-sm text-gray-400">{component.type}</span>
          </div>
        );
    }
  };

  return (
    <div
      ref={componentRef}
      className={`absolute cursor-move select-none ${
        isSelected ? 'ring-2 ring-builder-accent ring-offset-2 ring-offset-gray-900' : ''
      }`}
      style={{
        left: component.position.x,
        top: component.position.y,
        zIndex: isSelected ? 10 : 1
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {renderComponent()}
      
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-builder-accent text-white px-2 py-1 rounded text-xs font-medium">
          {component.type}
        </div>
      )}
    </div>
  );
}