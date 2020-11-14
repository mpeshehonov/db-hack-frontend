import React from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from "react-router-dom";

const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Layout.Sider width={250} className="site-layout-background">
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['building']}
        defaultOpenKeys={['company', 'building', 'buh', 'marketing']}
        mode="inline"
      >
        <Menu.Item key="0"><NavLink to="/">Главная</NavLink></Menu.Item>
        <SubMenu
          key="company"
          title={
            <span>Строительная компания</span>
          }
        >
          <SubMenu key="building" title="Строительный отдел">
            <Menu.ItemGroup key="brigada" title="Бригада 1">
              <Menu.Item key="1">Каменщики</Menu.Item>
              <Menu.Item key="2">Арматурщики</Menu.Item>
              <Menu.Item key="3">Доставщики</Menu.Item>
              <Menu.Item key="4">Грузчики</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu key="buh" title="Бухгалтерия">
            <Menu.Item key="5">Юристы</Menu.Item>
            <Menu.Item key="6">Бухгалтера</Menu.Item>
          </SubMenu>
          <SubMenu key="marketing" title="Отдел маркетинга">
            <Menu.Item key="7"><NavLink to="/marketers">Маркетологи</NavLink></Menu.Item>
            <Menu.Item key="8">SMM</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Layout.Sider>
  )
}

export default Sidebar;
