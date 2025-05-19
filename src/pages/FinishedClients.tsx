
import React, { useState } from 'react';
import { Table, Input, DatePicker, Button, Space, Tag } from 'antd';
import { SearchOutlined, FileExcelOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface Client {
  key: string;
  id: string;
  name: string;
  completionDate: string;
  implementer: string;
  totalTime: number; // in days
}

const clients: Client[] = [
  {
    key: '1',
    id: 'FIN001',
    name: 'Bar E',
    completionDate: '2025-05-10',
    implementer: 'Ana Souza',
    totalTime: 15,
  },
  {
    key: '2',
    id: 'FIN002',
    name: 'Restaurante F',
    completionDate: '2025-05-05',
    implementer: 'Carlos Oliveira',
    totalTime: 12,
  },
  {
    key: '3',
    id: 'FIN003',
    name: 'Hamburgueria G',
    completionDate: '2025-04-28',
    implementer: 'Pedro Costa',
    totalTime: 20,
  },
  {
    key: '4',
    id: 'FIN004',
    name: 'Sorveteria H',
    completionDate: '2025-04-15',
    implementer: 'Fernanda Lima',
    totalTime: 10,
  },
  {
    key: '5',
    id: 'FIN005',
    name: 'Padaria I',
    completionDate: '2025-03-30',
    implementer: 'João Silva',
    totalTime: 18,
  },
];

const FinishedClients: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<any>({});
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [searchText, setSearchText] = useState('');

  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    setDateRange(dates);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setDateRange(null);
    setSearchText('');
  };

  const handleExport = () => {
    console.log('Exporting to Excel...');
    // Here you would implement the actual export functionality
  };

  const getFilteredData = () => {
    return clients.filter(client => {
      // Apply search filter
      if (searchText && !client.name.toLowerCase().includes(searchText.toLowerCase()) && 
          !client.id.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }
      
      // Apply date range filter
      if (dateRange && dateRange[0] && dateRange[1]) {
        const clientDate = dayjs(client.completionDate);
        if (!clientDate.isAfter(dateRange[0]) || !clientDate.isBefore(dateRange[1])) {
          return false;
        }
      }
      
      return true;
    });
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
      title: 'Data de Conclusão',
      dataIndex: 'completionDate',
      key: 'completionDate',
      sorter: (a: Client, b: Client) => a.completionDate.localeCompare(b.completionDate),
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Responsável',
      dataIndex: 'implementer',
      key: 'implementer',
      filters: [
        { text: 'Ana Souza', value: 'Ana Souza' },
        { text: 'Carlos Oliveira', value: 'Carlos Oliveira' },
        { text: 'Pedro Costa', value: 'Pedro Costa' },
        { text: 'Fernanda Lima', value: 'Fernanda Lima' },
        { text: 'João Silva', value: 'João Silva' },
      ],
      filteredValue: filteredInfo.implementer || null,
      onFilter: (value: string, record: Client) => record.implementer === value,
    },
    {
      title: 'Tempo Total (dias)',
      dataIndex: 'totalTime',
      key: 'totalTime',
      sorter: (a: Client, b: Client) => a.totalTime - b.totalTime,
      render: (time: number) => (
        <Tag color={time <= 15 ? 'green' : time <= 20 ? 'orange' : 'red'}>
          {time} dias
        </Tag>
      ),
    },
  ];

  return (
    <div className="finished-clients-page">
      <h1 className="text-2xl font-bold mb-6">Clientes Finalizados</h1>
      
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="flex flex-wrap gap-4">
          <Input 
            placeholder="Buscar por ID ou nome" 
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          
          <RangePicker 
            value={dateRange}
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
          />
          
          <Button onClick={clearFilters}>Limpar Filtros</Button>
        </div>
        
        <Button 
          type="primary" 
          icon={<FileExcelOutlined />} 
          onClick={handleExport}
        >
          Exportar
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={getFilteredData()} 
        rowKey="key"
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters) => {
          setFilteredInfo(filters);
        }}
      />
    </div>
  );
};

export default FinishedClients;
