import React from 'react';
import './styles.scss';
import {PageHeader} from "antd";

const Plan = () => {
  
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="План"
      />
      <canvas id="first_plan"> </canvas>
    </div>
  )
}

export default Plan
