
import React from 'react';
import WorkflowTabs from '../components/workflow/WorkflowTabs';
import { Card } from 'antd';

const Demandas: React.FC = () => {
  return (
    <div className="demandas-page">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Demandas</h1>
      <Card>
        <WorkflowTabs />
      </Card>
    </div>
  );
};

export default Demandas;
