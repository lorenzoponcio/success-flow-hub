
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Determine which menu item is active
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return ['dashboard'];
    if (path.includes('/employee')) return ['employee'];
    if (path === '/clients') return ['clients'];
    if (path === '/finished-clients') return ['finished'];
    return ['dashboard'];
  };

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="p-4 flex items-center justify-center">
          <span className={`logo-text transition-all duration-300 ${collapsed ? 'hidden' : 'block'}`}>
            MultipPedidos
          </span>
          <span className={`logo-text transition-all duration-300 ${collapsed ? 'block' : 'hidden'}`}>
            MP
          </span>
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: 'employee',
              icon: <UserOutlined />,
              label: <Link to="/employee/me">Minha Área</Link>,
            },
            {
              key: 'clients',
              icon: <TeamOutlined />,
              label: <Link to="/clients">Clientes</Link>,
            },
            {
              key: 'finished',
              icon: <CheckCircleOutlined />,
              label: <Link to="/finished-clients">Finalizados</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white flex items-center justify-between">
          <div className="p-4">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger text-xl',
              onClick: toggleCollapsed,
            })}
          </div>
          <div className="pr-4">
            <UserOutlined className="mr-2" />
            <span>Usuário</span>
          </div>
        </Header>
        <Content
          className="m-6 p-6 bg-white"
          style={{ borderRadius: '8px' }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
