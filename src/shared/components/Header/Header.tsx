import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <Layout.Header className="header site-layout-background">
      <div className="logo">РосАтом</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/forecast">Прогноз</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/plan">План</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
