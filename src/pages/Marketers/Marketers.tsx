import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import './Marketers.scss';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// @ts-ignore
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import {Col, InputNumber, PageHeader, Row, Slider} from "antd";
import am4langRu from "@amcharts/amcharts4/lang/ru_RU";

am4core.useTheme(am4themesAnimated);

const data3: number [] = [0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,8,9,9,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,11,12,12,12,12,12,12,13,13,13,13,13,13,14,14,14,14,14,14,15,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,17,18,18,18,18,18,18,19,19,19,19,19,19,20,20,20,20,20,20,21,21,21,21,21,21,22,22,22,22,22,22,23,23,23,23,23,23,24,24,24,24,24,24,25,25,25,25,25,25,26,26,26,26,26,26,27,27,27,27,27,27,28,28,28,28,28,28,29,29,29,29,29,29,30,30,30,30,30,30,31,31,31,31,31,31,32,32,32,32,32,32,33,33,33,33,33,33,34,34,34,34,34,34,35,35,35,35,35,35,36,36,36,36,36,36,37,37,37,37,38,38,38,38,38,38,39,39,39,39,39,39,40,40,40,40,40,40,41,41,41,42,42,42,42,42,42,43,43,43,43,43,43,44,44,44,44,44,45,45,45,45,45,45,46,46,46,46,46,46,47,47,48,48,49,49,49,49,49,50,50,50,51,51,51,51,52,52,53,53,53,54,54,55,55,56,56,57,57,57,58,58,58,59,59,59,60,61,62,63,64,64,64,64,64,64,65,65,65,65,66,66,67,67,67,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,100,100,100]

const initialData: any[] = [];
const data1: any[] = [];
// let visits = 100;


for (let i = 1; i < 366; i += 1) {
    // visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    initialData.push({date: new Date(2018, 0, i), value: data3[i]});
}

// const positiveOnly = (value: number) => value > 0 ? value : 0;

const Marketers = () => {
    console.dir(initialData);
    const chart = useRef(null);
    const [factor1, setFactor1] = useState(0);
    const [factor2, setFactor2] = useState(0);
    const [factor3, setFactor3] = useState(0);
    const [factor4, setFactor4] = useState(0);

    useEffect(() => {
        data1.length = 0;
        const minValue = Math.min(...data3);
        const maxValue = Math.max(...data3);
        let currentValue: number;
        initialData.forEach((point, i) => {

            if (initialData[i - factor1]) {
                currentValue = initialData[i - factor1].value
            } else
            if (factor1 > 0 && !initialData[i - factor1]) {
                currentValue = minValue;
            } else
            if (factor1 < 0 && !initialData[i - factor1]) {
                currentValue = maxValue;
            }

            data1.push({
                date: point.date,
                value: currentValue
            })
        })
        // @ts-ignore
        chart.current.validateData();
        // eslint-disable-next-line react/destructuring-assignment
    }, [factor1, factor2, factor3, factor4])


    useLayoutEffect(() => {
        const x = am4core.create("chartdiv", am4charts.XYChart);
        x.language.locale = am4langRu;
        x.paddingRight = 20;
        x.data = data1;

        const dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        valueAxis.calculateTotals = true;
        valueAxis.min = 0;
        valueAxis.max = 110;
        valueAxis.strictMinMax = true;
        valueAxis.title.text = "Объём выполняемых работ, %";
        valueAxis.title.fontWeight = "bold";
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
    }, []);

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
                        Смешение даты начала проекта
                    </div>
                    <div style={{ width: '80%', float: 'left' }}>
                        <Slider
                            min={-100}
                            max={100}
                            onChange={setFactor1}
                            value={factor1}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{ width: '10%', float: 'left' }}>
                        <InputNumber
                            min={-100}
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
