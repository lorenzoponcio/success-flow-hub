import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface DemandItem {
  key: string;
  id: string;
  client: string;
  responsible: string;
  deadline: string;
  status: 'aguardando' | 'em andamento' | 'concluído';
}

const initialData: DemandItem[] = [
  {
    key: '1',
    id: 'CRI001',
    client: 'Restaurante A',
    responsible: 'Ana Souza',
    deadline: '2025-06-10',
    status: 'aguardando',
  },
  {
    key: '2',
    id: 'CRI002',
    client: 'Pizzaria B',
    responsible: 'Pedro Costa',
    deadline: '2025-06-15',
    status: 'em andamento',
  },
];

const CriacaoTab: React.FC = () => {
  const [data, setData] = useState<DemandItem[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const newDemand: DemandItem = {
        key: `cri-${Date.now()}`,
        id: values.id,
        client: values.client,
        responsible: values.responsible,
        deadline: values.deadline.format('YYYY-MM-DD'),
        status: values.status,
      };

      setData([...data, newDemand]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleStatusChange = (record: DemandItem, newStatus: 'aguardando' | 'em andamento' | 'concluído') => {
    const updatedData = data.map(item => {
      if (item.key === record.key) {
        return { ...item, status: newStatus };
      }
      return item;
    });

    setData(updatedData.filter(item => !(item.key === record.key && newStatus === 'concluído')));
    
    // Lógica para mover para a próxima etapa poderia ser adicionada aqui
    if (newStatus === 'concluído') {
      // Adicionar a demanda à próxima fase (Implantação)
      console.log(`Demanda ${record.id} movida para Implantação`);
    }
  };

  const columns: ColumnsType<DemandItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsible',
      key: 'responsible',
      filters: [
        { text: 'Ana Souza', value: 'Ana Souza' },
        { text: 'Pedro Costa', value: 'Pedro Costa' },
      ],
      onFilter: (value, record) => record.responsible.indexOf(value as string) === 0,
    },
    {
      title: 'Data de Vencimento',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => a.deadline.localeCompare(b.deadline),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Select 
          defaultValue={record.status} 
          style={{ width: 140 }}
          onChange={(value) => handleStatusChange(record, value as 'aguardando' | 'em andamento' | 'concluído')}
        >
          <Option value="aguardando">
            <Tag color="orange">Aguardando</Tag>
          </Option>
          <Option value="em andamento">
            <Tag color="blue">Em Andamento</Tag>
          </Option>
          <Option value="concluído">
            <Tag color="green">Concluído</Tag>
          </Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="criacao-tab">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Criação de Cardápios</h2>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Adicionar Demanda
        </Button>
      </div>
      
      <div className="mb-4">
        <Input.Search 
          placeholder="Buscar por nome ou ID" 
          enterButton={<SearchOutlined />}
          style={{ maxWidth: 300 }}
        />
      </div>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="key" 
        pagination={{ pageSize: 10 }} 
      />

      <Modal
        title="Adicionar Nova Demanda de Criação"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreate}>
            Criar
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ status: 'aguardando' }}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Por favor, insira o ID!' }]}
          >
            <Input prefix="CRI" placeholder="Número de identificação" />
          </Form.Item>
          <Form.Item
            name="client"
            label="Cliente"
            rules={[{ required: true, message: 'Por favor, selecione o cliente!' }]}
          >
            <Select placeholder="Selecione um cliente">
              <Option value="Restaurante A">Restaurante A</Option>
              <Option value="Pizzaria B">Pizzaria B</Option>
              <Option value="Lanchonete C">Lanchonete C</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="responsible"
            label="Responsável"
            rules={[{ required: true, message: 'Por favor, selecione o responsável!' }]}
          >
            <Select placeholder="Selecione um responsável">
              <Option value="Ana Souza">Ana Souza</Option>
              <Option value="Pedro Costa">Pedro Costa</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="deadline"
            label="Data de Vencimento"
            rules={[{ required: true, message: 'Por favor, selecione uma data!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, selecione o status!' }]}
          >
            <Select>
              <Option value="aguardando">Aguardando</Option>
              <Option value="em andamento">Em Andamento</Option>
              <Option value="concluído">Concluído</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CriacaoTab;
