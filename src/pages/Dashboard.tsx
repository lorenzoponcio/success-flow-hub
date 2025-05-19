
import React from 'react';
import { Column } from '@ant-design/charts';
import { Row, Col, Card } from 'antd';

const Dashboard: React.FC = () => {
  // Dados de exemplo para o gráfico de Status da Fila de Coleta
  const coletaData = [
    { category: 'Coletado concluído', value: 48 },
    { category: 'Pago', value: 10 },
  ];

  // Dados de exemplo para o gráfico de Status da Fila de Implantação
  const implantacaoData = [
    { category: 'Concluído', value: 40 },
    { category: 'Em andamento', value: 25 },
    { category: 'Assinatura pendente', value: 4 },
    { category: 'Aguardando pendência', value: 8 },
  ];

  // Dados de exemplo para o gráfico de Status da Fila de Produção
  const producaoData = [
    { category: 'Pronto para Produção', value: 10 },
    { category: 'Em andamento', value: 17 },
    { category: 'Concluído', value: 40 },
    { category: 'Cliente Sugeriu', value: 5 },
  ];

  // Configuração comum para gráficos
  const getChartConfig = (data: any[], color: string = '#5447C2') => {
    return {
      data,
      xField: 'category',
      yField: 'value',
      color,
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.8,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        category: { alias: 'Estado' },
        value: { alias: 'Quantidade' },
      },
    };
  };

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-6">Dashboard Geral - IS</h1>
      
      <Row gutter={24}>
        <Col span={8}>
          <div className="chart-card">
            <div className="chart-title">Tempo Médio de Coleta</div>
            <div className="chart-value">1,73</div>
          </div>
        </Col>
        <Col span={8}>
          <div className="chart-card">
            <div className="chart-title">Tempo Médio de Implantação</div>
            <div className="chart-value">0,03</div>
          </div>
        </Col>
        <Col span={8}>
          <div className="chart-card">
            <div className="chart-title">Tempo Médio de Implantação - Geral</div>
            <div className="chart-value">2,53</div>
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="mt-8">
        <Col span={12}>
          <Card title="Status Fila de Coleta" className="mb-6">
            <Column {...getChartConfig(coletaData)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Status Fila de Implantação" className="mb-6">
            <Column {...getChartConfig(implantacaoData)} />
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Card title="Status Fila de Produção" className="mb-6">
            <Column {...getChartConfig(producaoData)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="TM de Montagem" className="mb-6">
            <div className="chart-card bg-primary">
              <div className="chart-value">2,5</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
