import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ComponentLibrary } from './ComponentLibrary';
import { ComponentTree } from './ComponentTree';
import { Component } from '../AppBuilder';
import { Package, Layers } from 'lucide-react';

interface BuilderSidebarProps {
  onAddComponent: (type: string, position: { x: number; y: number }) => void;
  components: Component[];
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
}

export function BuilderSidebar({ 
  onAddComponent, 
  components, 
  selectedComponent, 
  onSelectComponent, 
  onDeleteComponent 
}: BuilderSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700 m-2">
          <TabsTrigger value="components" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Components</span>
          </TabsTrigger>
          <TabsTrigger value="layers" className="flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>Layers</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="components" className="flex-1 mt-0">
          <ComponentLibrary onAddComponent={onAddComponent} />
        </TabsContent>
        
        <TabsContent value="layers" className="flex-1 mt-0">
          <ComponentTree
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={onSelectComponent}
            onDeleteComponent={onDeleteComponent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}