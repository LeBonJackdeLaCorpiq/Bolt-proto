import React from 'react';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from 'react-resizable-panels';
import Header from './Header';

interface LayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  analytics?: React.ReactNode;
}

export default function Layout({ sidebar, content, analytics }: LayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      <PanelGroup direction="horizontal" autoSaveId="default-layout">
        {/* Sidebar */}
        <Panel defaultSize={20} minSize={15} maxSize={25} className="bg-white border-r">
          {sidebar}
        </Panel>

        <PanelResizeHandle className="panel-resize-handle" />

        {/* Main Content */}
        <Panel defaultSize={analytics ? 60 : 80} minSize={45}>
          <div className="h-full overflow-auto bg-gray-50">
            <div className="p-8">
              <Header 
                userName="Paul" 
                onToolClick={(page) => console.log('Tool clicked:', page)}
              />
              {content}
            </div>
          </div>
        </Panel>

        {analytics && (
          <>
            <PanelResizeHandle className="panel-resize-handle" />
            
            {/* Analytics Panel */}
            <Panel defaultSize={20} minSize={15} maxSize={30} className="border-l">
              <div className="h-full overflow-auto bg-gray-50">
                <div className="p-4">
                  {analytics}
                </div>
              </div>
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
}