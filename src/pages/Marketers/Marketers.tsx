import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import './Marketers.scss';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// @ts-ignore
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import {Col, InputNumber, PageHeader, Row, Slider} from "antd";
import am4langRu from "@amcharts/amcharts4/lang/ru_RU";

am4core.useTheme(am4themesAnimated);

const initialData: any[] = [];
const data1: any[] = [];
let visits = 100;

for (let i = 1; i < 366; i += 1) {
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    initialData.push({date: new Date(2018, 0, i), value: visits});
}

const positiveOnly = (value: number) => value > 0 ? value : 0;

const Marketers = () => {
    const chart = useRef(null);
    const [factor1, setFactor1] = useState(0);
    const [factor2, setFactor2] = useState(0);
    const [factor3, setFactor3] = useState(0);
    const [factor4, setFactor4] = useState(0);

    useEffect(() => {
        data1.length = 0;
        initialData.forEach((point, i) => {
            data1.push({
                date: point.date,
                value: positiveOnly(point.value - factor1
                    - (i > 0 ? (initialData[i-1].value + factor2)/2 : 0)
                    - Math.ceil(factor3 / 2)
                    + Math.ceil(factor4 * 1.5)
                )
            })
        })
    }, [factor1, factor2, factor3, factor4])

    useLayoutEffect(() => {
        const x = am4core.create("chartdiv", am4charts.XYChart);
        x.language.locale = am4langRu;
        x.paddingRight = 20;
        x.data = data1;

        const dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        // @ts-ignore
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        const series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";
        x.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        x.scrollbarX = scrollbarX;

        // @ts-ignore
        chart.current = x;

        return () => {
            x.dispose();
        };
    }, [factor1, factor2, factor3, factor4]);

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Маркетологи"
                subTitle="Система для строительных компаний"
            />
            <Row style={{margin: '30px 45px'}}>
                <Col span={12}>
                    <div style={{ width: '100%' }}>
                        Фактор №1
                    </div>
                    <div style={{ width: '80%', float: 'left' }}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor1}
                            value={factor1}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{ width: '10%', float: 'left' }}>
                        <InputNumber
                            min={0}
                            max={100}
                            onVolumeChange={() => setFactor1}
                            value={factor1}
                            style={{margin: '0 15px', width: '60px'}}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ width: '100%' }}>
                        Фактор №2
                    </div>
                    <div style={{ width: '80%', float: 'left' }}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor2}
                            value={factor2}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{ width: '10%', float: 'left' }}>
                        <InputNumber
                            min={0}
                            max={100}
                            onVolumeChange={() => setFactor2}
                            value={factor2}
                            style={{margin: '0 15px', width: '60px'}}
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{margin: '30px 45px'}}>
                <Col span={12}>
                    <div style={{ width: '100%' }}>
                        Фактор №3
                    </div>
                    <div style={{ width: '80%', float: 'left' }}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor3}
                            value={factor3}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{ width: '10%', float: 'left' }}>
                        <InputNumber
                            min={0}
                            max={100}
                            onVolumeChange={() => setFactor3}
                            value={factor3}
                            style={{margin: '0 15px', width: '60px'}}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ width: '100%' }}>
                        Фактор №4
                    </div>
                    <div style={{ width: '80%', float: 'left' }}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor4}
                            value={factor4}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{ width: '10%', float: 'left' }}>
                        <InputNumber
                            min={0}
                            max={100}
                            onVolumeChange={() => setFactor4}
                            value={factor4}
                            style={{margin: '0 15px', width: '60px'}}
                        />
                    </div>
                </Col>
            </Row>
            <div id="chartdiv" style={{width: "100%", height: "500px"}}> </div>
        </div>

    );
}

export default Marketers;
