import React from 'react';
import { Layout } from 'antd';
import './Header.scss';

const Header = () => {
  return (
    <Layout.Header className="header site-layout-background">
      <div className="logo">РосАтом</div>
    </Layout.Header>
  );
};

export default Header;
