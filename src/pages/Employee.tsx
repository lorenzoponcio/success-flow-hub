
import React, { useState } from 'react';
import { Column } from '@ant-design/charts';
import { Row, Col, Card, Form, Input, Button, List, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd/es/checkbox';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const Employee: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Revisar cardápio do Restaurante A', completed: false },
    { id: '2', title: 'Contatar Cliente B para coleta de informações', completed: true },
    { id: '3', title: 'Finalizar implantação do Cliente C', completed: false },
  ]);

  const [form] = Form.useForm();

  // Dados de exemplo para os gráficos de desempenho
  const monthlyData = [
    { mes: 'Jan', cardapios: 5 },
    { mes: 'Fev', cardapios: 7 },
    { mes: 'Mar', cardapios: 10 },
    { mes: 'Abr', cardapios: 8 },
    { mes: 'Mai', cardapios: 12 },
  ];

  const handleTaskAdd = (values: { taskTitle: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: values.taskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    form.resetFields();
  };

  const handleTaskToggle = (id: string, e: CheckboxProps) => {
    const checked = e.target?.checked;
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: Boolean(checked) } : task
    );
    setTasks(updatedTasks);
  };

  const taskRemove = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const config = {
    data: monthlyData,
    xField: 'mes',
    yField: 'cardapios',
    color: '#5447C2',
    label: {
      formatter: (text: any) => text.cardapios,
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      mes: { alias: 'Mês' },
      cardapios: { alias: 'Cardápios Concluídos' },
    },
  };

  return (
    <div className="employee-page">
      <h1 className="text-2xl font-bold mb-6">Minha Área</h1>
      
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Card title="Minhas Tarefas" className="mb-6">
            <div className="mb-4">
              <Form form={form} layout="inline" onFinish={handleTaskAdd}>
                <Form.Item
                  name="taskTitle"
                  rules={[{ required: true, message: 'Digite uma tarefa' }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Adicionar nova tarefa" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Adicionar
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={tasks}
              renderItem={(task) => (
                <List.Item
                  actions={[
                    <Button 
                      type="text" 
                      danger 
                      onClick={() => taskRemove(task.id)}
                    >
                      Remover
                    </Button>
                  ]}
                >
                  <Checkbox 
                    checked={task.completed} 
                    onChange={(e) => handleTaskToggle(task.id, e)}
                    className="mr-2"
                  />
                  <span style={{ 
                    textDecoration: task.completed ? 'line-through' : 'none' 
                  }}>
                    {task.title}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={16}>
          <Card title="Meu Desempenho" className="mb-6">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <div className="chart-card">
                  <div className="chart-title">TMM (Tempo Médio de Montagem)</div>
                  <div className="chart-value">1,8</div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="chart-card">
                  <div className="chart-title">Total de Cardápios Concluídos</div>
                  <div className="chart-value">42</div>
                </div>
              </Col>
            </Row>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Cardápios Concluídos por Mês</h3>
              <Column {...config} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Employee;
