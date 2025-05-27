
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import WorkflowTabs from '../components/workflow/WorkflowTabs';
import { useClients, useCreateClient, useUpdateClient, useDeleteClient } from '../hooks/useClients';
import { Client } from '../services/apiService';

const { Option } = Select;

const Clients: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'workflow'>('list');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // React Query hooks
  const { data: clients = [], isLoading, error } = useClients();
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  const showModal = (client?: Client) => {
    setIsModalVisible(true);
    setEditingClient(client || null);
    
    if (client) {
      form.setFieldsValue(client);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingClient(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingClient?.id) {
        // Atualizar cliente existente
        await updateClientMutation.mutateAsync({ 
          id: editingClient.id, 
          client: values 
        });
        message.success('Cliente atualizado com sucesso!');
      } else {
        // Criar novo cliente
        await createClientMutation.mutateAsync(values);
        message.success('Cliente criado com sucesso!');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setEditingClient(null);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      message.error('Erro ao salvar cliente. Verifique se o backend está rodando.');
    }
  };

  const handleDelete = async (client: Client) => {
    if (!client.id) return;
    
    try {
      await deleteClientMutation.mutateAsync(client.id);
      message.success('Cliente deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      message.error('Erro ao deletar cliente. Verifique se o backend está rodando.');
    }
  };

  if (error) {
    return (
      <div className="clients-page">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Clientes</h1>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Erro ao conectar com o backend. Verifique se o servidor está rodando em http://localhost:8080
        </div>
      </div>
    );
  }

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
            onClick={() => showModal(record)}
            type="text"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record)} 
            type="text"
            danger
            loading={deleteClientMutation.isPending}
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
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showModal()}
              loading={createClientMutation.isPending}
            >
              Adicionar Cliente
            </Button>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={clients} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
            loading={isLoading}
          />
        </>
      ) : (
        <WorkflowTabs />
      )}

      <Modal
        title={editingClient ? "Editar Cliente" : "Adicionar Novo Cliente"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSave}
            loading={createClientMutation.isPending || updateClientMutation.isPending}
          >
            {editingClient ? "Salvar" : "Adicionar"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="client_form"
        >
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
