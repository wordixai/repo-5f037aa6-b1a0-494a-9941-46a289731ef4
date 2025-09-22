import { useState } from 'react';
import { Component } from '../AppBuilder';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Copy, Download } from 'lucide-react';

interface CodePanelProps {
  components: Component[];
}

export function CodePanel({ components }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  const generateReactCode = () => {
    const imports = new Set(['import React from "react";']);
    const componentCode: string[] = [];

    components.forEach((component) => {
      switch (component.type) {
        case 'button':
          imports.add('import { Button } from "./components/ui/button";');
          componentCode.push(
            `<Button variant="${component.props.variant}" size="${component.props.size}">
              ${component.props.text}
            </Button>`
          );
          break;
        
        case 'text':
          componentCode.push(
            `<p className="text-${component.props.size} font-${component.props.weight}">
              ${component.props.content}
            </p>`
          );
          break;
        
        case 'input':
          imports.add('import { Input } from "./components/ui/input";');
          componentCode.push(
            `<Input 
              placeholder="${component.props.placeholder}"
              type="${component.props.type}"
            />`
          );
          break;
        
        case 'card':
          imports.add('import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";');
          componentCode.push(
            `<Card>
              <CardHeader>
                <CardTitle>${component.props.title}</CardTitle>
                <CardDescription>${component.props.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
            </Card>`
          );
          break;
        
        case 'image':
          componentCode.push(
            `<img 
              src="${component.props.src}"
              alt="${component.props.alt}"
              className="max-w-[300px] max-h-[200px] object-cover rounded"
            />`
          );
          break;
      }
    });

    return `${Array.from(imports).join('\n')}

export function GeneratedComponent() {
  return (
    <div className="space-y-6 p-6">
      ${componentCode.join('\n      ')}
    </div>
  );
}`;
  };

  const generateHTMLCode = () => {
    const componentCode: string[] = [];

    components.forEach((component) => {
      switch (component.type) {
        case 'button':
          componentCode.push(
            `<button class="btn btn-${component.props.variant} btn-${component.props.size}">
              ${component.props.text}
            </button>`
          );
          break;
        
        case 'text':
          componentCode.push(
            `<p class="text-${component.props.size} font-${component.props.weight}">
              ${component.props.content}
            </p>`
          );
          break;
        
        case 'input':
          componentCode.push(
            `<input 
              type="${component.props.type}"
              placeholder="${component.props.placeholder}"
              class="form-input"
            />`
          );
          break;
        
        case 'card':
          componentCode.push(
            `<div class="card">
              <div class="card-header">
                <h3 class="card-title">${component.props.title}</h3>
                <p class="card-description">${component.props.description}</p>
              </div>
              <div class="card-content">
                <p>Card content goes here</p>
              </div>
            </div>`
          );
          break;
        
        case 'image':
          componentCode.push(
            `<img 
              src="${component.props.src}"
              alt="${component.props.alt}"
              class="image-responsive"
            />`
          );
          break;
      }
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated App</title>
  <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body>
  <div class="space-y-6 p-6">
    ${componentCode.join('\n    ')}
  </div>
</body>
</html>`;
  };

  const generateJSONCode = () => {
    return JSON.stringify(components, null, 2);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Generated Code</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 hover:bg-gray-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="react" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700 mx-4 mt-4">
          <TabsTrigger value="react">React JSX</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="react" className="flex-1 mt-4">
          <div className="mx-4 mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generateReactCode())}
              className="border-gray-700 hover:bg-gray-800"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <ScrollArea className="flex-1 mx-4 mb-4">
            <pre className="bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-100 overflow-auto">
              <code>{generateReactCode()}</code>
            </pre>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="html" className="flex-1 mt-4">
          <div className="mx-4 mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generateHTMLCode())}
              className="border-gray-700 hover:bg-gray-800"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <ScrollArea className="flex-1 mx-4 mb-4">
            <pre className="bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-100 overflow-auto">
              <code>{generateHTMLCode()}</code>
            </pre>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="json" className="flex-1 mt-4">
          <div className="mx-4 mb-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generateJSONCode())}
              className="border-gray-700 hover:bg-gray-800"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <ScrollArea className="flex-1 mx-4 mb-4">
            <pre className="bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-100 overflow-auto">
              <code>{generateJSONCode()}</code>
            </pre>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}