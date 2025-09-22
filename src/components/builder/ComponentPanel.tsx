import { ScrollArea } from '../ui/scroll-area';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Component } from '../AppBuilder';
import { Settings } from 'lucide-react';

interface ComponentPanelProps {
  component: Component;
  onUpdate: (updates: Partial<Component>) => void;
}

export function ComponentPanel({ component, onUpdate }: ComponentPanelProps) {
  const updateProps = (key: string, value: any) => {
    onUpdate({
      props: {
        ...component.props,
        [key]: value
      }
    });
  };

  const renderPropertyEditor = () => {
    switch (component.type) {
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Button Text</Label>
              <Input
                id="text"
                value={component.props.text || ''}
                onChange={(e) => updateProps('text', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="variant">Variant</Label>
              <Select value={component.props.variant} onValueChange={(value) => updateProps('variant', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="size">Size</Label>
              <Select value={component.props.size} onValueChange={(value) => updateProps('size', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Text Content</Label>
              <Input
                id="content"
                value={component.props.content || ''}
                onChange={(e) => updateProps('content', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="size">Text Size</Label>
              <Select value={component.props.size} onValueChange={(value) => updateProps('size', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">Extra Small</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                  <SelectItem value="2xl">2X Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={component.props.placeholder || ''}
                onChange={(e) => updateProps('placeholder', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="type">Input Type</Label>
              <Select value={component.props.type} onValueChange={(value) => updateProps('type', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="tel">Phone</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Card Title</Label>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => updateProps('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={component.props.description || ''}
                onChange={(e) => updateProps('description', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={component.props.src || ''}
                onChange={(e) => updateProps('src', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={component.props.alt || ''}
                onChange={(e) => updateProps('alt', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No properties available for this component</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-semibold capitalize">{component.type} Properties</h3>
        <p className="text-sm text-gray-400">#{component.id}</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {renderPropertyEditor()}
        
        <div className="mt-6 pt-6 border-t border-gray-800">
          <h4 className="text-sm font-medium mb-4">Position</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="x">X Position</Label>
              <Input
                id="x"
                type="number"
                value={component.position.x}
                onChange={(e) => onUpdate({ 
                  position: { ...component.position, x: parseInt(e.target.value) || 0 }
                })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="y">Y Position</Label>
              <Input
                id="y"
                type="number"
                value={component.position.y}
                onChange={(e) => onUpdate({ 
                  position: { ...component.position, y: parseInt(e.target.value) || 0 }
                })}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}