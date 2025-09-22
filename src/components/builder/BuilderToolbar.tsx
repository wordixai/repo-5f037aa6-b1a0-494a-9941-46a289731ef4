import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Eye, Code, Palette, Play, Download, Save } from 'lucide-react';

interface BuilderToolbarProps {
  mode: 'design' | 'preview' | 'code';
  onModeChange: (mode: 'design' | 'preview' | 'code') => void;
}

export function BuilderToolbar({ mode, onModeChange }: BuilderToolbarProps) {
  return (
    <div className="flex items-center space-x-4">
      <Tabs value={mode} onValueChange={(value) => onModeChange(value as any)}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="design" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Design</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>Code</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>
        
        <Button size="sm" className="builder-gradient">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}