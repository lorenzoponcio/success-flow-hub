
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import WorkflowTabs from '../components/workflow/WorkflowTabs';

const { Option } = Select;

interface Client {
  key: string;
  id: string;
  name: string;
  contact: string;
  email: string;
  status: string;
}

const initialClients: Client[] = [
  {
    key: '1',
    id: 'CLI001',
    name: 'Restaurante A',
    contact: '(11) 98765-4321',
    email: 'contato@restaurantea.com',
    status: 'coleta',
  },
  {
    key: '2',
    id: 'CLI002',
    name: 'Pizzaria B',
    contact: '(11) 91234-5678',
    email: 'contato@pizzariab.com',
    status: 'criação',
  },
  {
    key: '3',
    id: 'CLI003',
    name: 'Lanchonete C',
    contact: '(11) 99876-5432',
    email: 'contato@lanchonetec.com',
    status: 'implantação',
  },
  {
    key: '4',
    id: 'CLI004',
    name: 'Cafeteria D',
    contact: '(11) 92345-6789',
    email: 'contato@cafeteriad.com',
    status: 'coleta',
  },
];

const Clients: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'workflow'>('list');
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingClientKey, setEditingClientKey] = useState<string | null>(null);

  const showModal = (clientKey?: string) => {
    setIsModalVisible(true);
    setEditingClientKey(clientKey || null);
    
    if (clientKey) {
      const client = clients.find(c => c.key === clientKey);
      if (client) {
        form.setFieldsValue(client);
      }
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingClientKey(null);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingClientKey) {
        // Edit existing client
        setClients(clients.map(client => 
          client.key === editingClientKey ? { ...values, key: editingClientKey } : client
        ));
      } else {
        // Add new client
        const newClient: Client = {
          key: `cli-${Date.now()}`,
          ...values,
        };
        setClients([...clients, newClient]);
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setEditingClientKey(null);
    });
  };

  const handleDelete = (key: string) => {
    setClients(clients.filter(client => client.key !== key));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Client, b: Client) => a.name.localeCompare(b.name),
    },
    {
      title: 'Contato',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'coleta') color = 'orange';
        if (status === 'criação') color = 'blue';
        if (status === 'implantação') color = 'green';
        
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Coleta', value: 'coleta' },
        { text: 'Criação', value: 'criação' },
        { text: 'Implantação', value: 'implantação' },
      ],
      onFilter: (value: string, record: Client) => record.status === value,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: unknown, record: Client) => (
        <Space size="small">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record.key)}
            type="text"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.key)} 
            type="text"
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="clients-page">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Clientes</h1>
        <div>
          <Button 
            type={viewMode === 'list' ? 'primary' : 'default'} 
            onClick={() => setViewMode('list')}
            className="mr-2"
          >
            Lista de Clientes
          </Button>
          <Button 
            type={viewMode === 'workflow' ? 'primary' : 'default'} 
            onClick={() => setViewMode('workflow')}
          >
            Workflow
          </Button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <>
          <div className="flex justify-between mb-4">
            <Input.Search 
              placeholder="Buscar por nome ou ID" 
              enterButton={<SearchOutlined />}
              style={{ maxWidth: 300 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Adicionar Cliente
            </Button>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={clients} 
            rowKey="key" 
            pagination={{ pageSize: 10 }}
          />
        </>
      ) : (
        <WorkflowTabs />
      )}

      <Modal
        title={editingClientKey ? "Editar Cliente" : "Adicionar Novo Cliente"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            {editingClientKey ? "Salvar" : "Adicionar"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="client_form"
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Por favor, insira o ID!' }]}
          >
            <Input prefix="CLI" placeholder="Número de identificação" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          >
            <Input placeholder="Nome do cliente" />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contato"
            rules={[{ required: true, message: 'Por favor, insira o contato!' }]}
          >
            <Input placeholder="Número de telefone" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor, insira o email!' },
              { type: 'email', message: 'Email inválido!' }
            ]}
          >
            <Input placeholder="Email do cliente" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, selecione o status!' }]}
          >
            <Select placeholder="Selecione o status">
              <Option value="coleta">Coleta</Option>
              <Option value="criação">Criação</Option>
              <Option value="implantação">Implantação</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
