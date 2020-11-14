import React from 'react';
import './styles.scss';
import {PageHeader} from "antd";
import Iframe from 'react-iframe';

const Plan = () => {

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="План"
      />
      <Iframe url="https://ex.semenushkin.ru/3d/"
              width="100%"
              height="600px"
              display="block"
              position="relative"/>
    </div>
  )
}

export default Plan
