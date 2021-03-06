
import React, {FC} from 'react';
import {Layout, Breadcrumb} from "antd";
import Header from "../Header";
import './PageLayout.scss';


const PageLayout: FC<any> = ({ children }) => {
  return (
    <>
      <Layout className="layout">
        <Header/>
        <Layout>
          <Layout.Content className="layout-content" style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">{children}</div>
          </Layout.Content>
        </Layout>
        <Layout.Footer style={{ textAlign: 'center' }}>
          РосАтом ©2020 Created by NOVA</Layout.Footer>
      </Layout>
    </>
  )
}

export default PageLayout
  