import React, {useEffect, useState} from 'react';

import {Row, Col, PageHeader, Slider, InputNumber} from "antd";

const Home = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);

  useEffect(() => {
    setFirst(first);
    setSecond(second);
    setThird(third);
    setFourth(fourth);
  }, [first, second, third, fourth]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Главная"
        subTitle="Система для строительных компаний"
      />
      <Row style={{ margin: '16px' }}>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            onChange={setFirst}
            value={first}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            onChange={() => setFirst}
            value={first}
          />
        </Col>
      </Row>
      <Row style={{ margin: '16px' }}>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            onChange={setSecond}
            value={second}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            onChange={() => setSecond}
            value={second}
          />
        </Col>
      </Row>
      <Row style={{ margin: '16px' }}>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            onChange={setThird}
            value={third}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            onChange={() => setThird}
            value={third}
          />
        </Col>
      </Row>
      <Row style={{ margin: '16px' }}>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            onChange={setFourth}
            value={fourth}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            onChange={() => setFourth}
            value={fourth}
          />
        </Col>
      </Row>
    </>
  );
};

export default Home;
