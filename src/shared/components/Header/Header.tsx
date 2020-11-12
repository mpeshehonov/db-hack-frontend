import React from 'react';
import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom";
import './Header.module.scss';

const Header = () => {
  return (
    <Layout.Header className="header site-layout-background">
      <div className="logo">РосАтом</div>
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/admin">
            Админка
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
