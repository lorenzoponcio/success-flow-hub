
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColetaTab from './ColetaTab';
import CriacaoTab from './CriacaoTab';
import ImplantacaoTab from './ImplantacaoTab';

const WorkflowTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('coleta');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="workflow-tabs">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coleta">Coleta</TabsTrigger>
          <TabsTrigger value="criacao">Criação</TabsTrigger>
          <TabsTrigger value="implantacao">Implantação</TabsTrigger>
        </TabsList>
        <TabsContent value="coleta">
          <ColetaTab />
        </TabsContent>
        <TabsContent value="criacao">
          <CriacaoTab />
        </TabsContent>
        <TabsContent value="implantacao">
          <ImplantacaoTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowTabs;
