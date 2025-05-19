
import React, { useState } from 'react';
import { Tabs } from 'antd';
import ColetaTab from './ColetaTab';
import CriacaoTab from './CriacaoTab';
import ImplantacaoTab from './ImplantacaoTab';

const { TabPane } = Tabs;

const WorkflowTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('coleta');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="workflow-tabs">
      <Tabs activeKey={activeTab} onChange={handleTabChange} type="card">
        <TabPane tab="Coleta" key="coleta">
          <ColetaTab />
        </TabPane>
        <TabPane tab="Criação" key="criacao">
          <CriacaoTab />
        </TabPane>
        <TabPane tab="Implantação" key="implantacao">
          <ImplantacaoTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default WorkflowTabs;
