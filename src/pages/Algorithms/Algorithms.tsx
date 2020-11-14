import React, {useEffect, useState} from 'react';
import {Row, Col, PageHeader, Slider, InputNumber, Input} from "antd";
import { maxRisk, sumValues } from '../../shared/utils/algorithms';

const Algorithms = () => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [risk, setRisk] = useState(0);
  const [maxName, setMaxName] = useState('none');
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const riskData = maxRisk(first, second, third, fourth);
    setMaxName(riskData.name);
    setRisk(riskData.value);

    const sumData = sumValues(first, second, third, fourth);
    setSum(sumData);

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
      <h3>Риск</h3>
      <Row style={{ margin: '16px' }}>
        <Col span={12}>
          <Slider
            disabled
            min={0}
            max={5000}
            onChange={setRisk}
            value={risk}
          />
        </Col>
        <Col span={4}>
          <Input
            onChange={() => setMaxName}
            value={maxName}
            placeholder="Максимальное значение"
          />
        </Col>
      </Row>
      <h3>Сумма</h3>
      <Row style={{ margin: '16px' }}>
        <Col span={12}>
          <Slider
            disabled
            min={0}
            max={400}
            onChange={setSum}
            value={sum}
          />
        </Col>
        <Col span={4}>
          <Input
            onChange={() => setSum}
            value={sum}
          />
        </Col>
      </Row>
    </>
  );
};

export default Algorithms;
