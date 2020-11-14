import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import './Marketers.scss';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// @ts-ignore
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import {Col, InputNumber, PageHeader, Row, Slider} from "antd";
import am4langRu from "@amcharts/amcharts4/lang/ru_RU";

am4core.useTheme(am4themesAnimated);

// имитация получения данных
const exampleData1: number [] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 15, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 19, 19, 19, 20, 20, 21, 21, 21, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 28, 28, 28, 29, 29, 29, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45, 45, 46, 46, 46, 46, 46, 46, 47, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 64, 64, 64, 64, 65, 65, 65, 65, 66, 66, 66, 66, 67, 67, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 92, 92, 93, 93, 93, 93, 93, 94, 95, 96, 97, 98, 98, 98, 99, 99, 100]
const exampleData2: number [] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 41, 41, 41, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45, 45, 46, 46, 46, 46, 46, 46, 47, 47, 48, 48, 49, 49, 49, 49, 49, 50, 50, 50, 51, 51, 51, 51, 52, 52, 53, 53, 53, 54, 54, 55, 55, 56, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 62, 63, 64, 64, 64, 64, 64, 64, 65, 65, 65, 65, 66, 66, 67, 67, 67, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
const exampleData3: number [] = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45, 45, 46, 46, 46, 46, 46, 46, 47, 47, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 50, 50, 50, 50, 50, 50, 51, 51, 51, 51, 51, 51, 52, 52, 52, 52, 52, 52, 53, 53, 53, 53, 53, 53, 54, 54, 54, 54, 54, 54, 55, 55, 55, 55, 55, 55, 56, 56, 56, 56, 56, 56, 57, 57, 57, 57, 57, 57, 58, 58, 58, 58, 58, 58, 59, 59, 59, 59, 59, 59, 60, 60, 60, 60, 60, 60, 61, 61, 61, 61, 61, 61, 62, 62, 62, 62, 62, 62, 63, 63, 63, 63, 63, 63, 64, 64, 64, 64, 64, 64, 65, 65, 65, 65, 65, 65, 66, 66, 66, 66, 66, 66, 67, 67, 67, 67, 67, 67, 68, 68, 68, 68, 68, 68, 69, 69, 69, 69, 69, 69, 70, 70, 70, 70, 70, 70, 71, 71, 71, 71, 71, 71, 72, 72, 72, 72, 72, 72, 73, 73, 73, 73, 73, 73, 74, 74, 74, 74, 74, 74, 75, 75, 75, 75, 75, 75, 76, 76, 76, 76, 76, 76, 77, 77, 77, 77, 77, 77, 78, 78, 78, 78, 78, 78, 79, 79, 79, 79, 79, 79, 80, 80, 80, 80, 80, 80, 81, 81, 81, 81, 81, 81, 82, 82, 82, 82, 82, 82, 83, 83, 83, 83, 83, 83, 84, 84, 84, 84, 84, 84, 85, 85, 85, 85, 85, 85, 86, 86, 86, 86, 86, 86, 87, 87, 87, 87, 87, 87, 88, 88, 88, 88, 88, 88, 89, 89, 89, 89, 89, 89, 90, 90, 90, 90, 90, 90, 91, 91, 91, 91, 91, 91, 92, 92, 92, 92, 92, 92, 93, 93, 93, 93, 93, 93, 94, 94, 94, 94, 94, 94, 95, 95, 95, 95, 95, 95, 96, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 98, 99, 99, 99, 99, 99, 99, 100]

const initialData1: any[] = [];
const initialData2: any[] = [];
const initialData3: any[] = [];
const graphData: any[] = [];

const graphLength = Math.max(exampleData1.length, exampleData2.length, exampleData3.length)

for (let i = 0; i < graphLength + 1; i += 1) {
    initialData1.push({date: new Date(2018, 0, i), value: exampleData1[i] !== undefined ? exampleData1[i] : 100});
    initialData2.push({date: new Date(2018, 0, i), value: exampleData2[i] !== undefined ? exampleData2[i] : 100});
    initialData3.push({date: new Date(2018, 0, i), value: exampleData3[i] !== undefined ? exampleData3[i] : 100});
}

const Marketers = () => {
    const chart = useRef(null);
    const [factor1, setFactor1] = useState(0);
    const [factor2, setFactor2] = useState(0);
    const [factor3, setFactor3] = useState(0);
    const [factor4, setFactor4] = useState(0);
    let currentValue1: number;
    let currentValue2: number;
    let currentValue3: number;

    useEffect(() => {
        graphData.length = 0;
        const minValue = Math.min(...exampleData1, ...exampleData2, ...exampleData3);
        const maxValue = Math.max(...exampleData1, ...exampleData2, ...exampleData3);

        for (let i = 0; i < graphLength + 1; i += 1) {
            if (initialData1[i - factor1]) {
                currentValue1 = initialData1[i - factor1].value
            } else if (factor1 > 0 && !initialData1[i - factor1]) {
                currentValue1 = minValue;
            } else if (factor1 < 0 && !initialData1[i - factor1]) {
                currentValue1 = maxValue;
            }

            if (initialData2[i - factor1]) {
                currentValue2 = initialData2[i - factor1].value
            } else if (factor1 > 0 && !initialData2[i - factor1]) {
                currentValue2 = minValue;
            } else if (factor1 < 0 && !initialData1[i - factor1]) {
                currentValue2 = maxValue;
            }

            if (initialData3[i - factor1]) {
                currentValue3 = initialData3[i - factor1].value
            } else if (factor1 > 0 && !initialData3[i - factor1]) {
                currentValue3 = minValue;
            } else if (factor1 < 0 && !initialData3[i - factor1]) {
                currentValue3 = maxValue;
            }

            graphData.push({
                date: new Date(2018, 0, i),
                value1: currentValue1,
                value2: currentValue2,
                value3: currentValue3
            })

        }
        // @ts-ignore
        chart.current.validateData();
        // eslint-disable-next-line react/destructuring-assignment
    }, [factor1, factor2, factor3, factor4])


    useLayoutEffect(() => {
        const x = am4core.create("chartdiv", am4charts.XYChart);
        x.language.locale = am4langRu;
        x.paddingRight = 20;
        x.data = graphData;

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

        const series1 = x.series.push(new am4charts.LineSeries());
        const series2 = x.series.push(new am4charts.LineSeries());
        const series3 = x.series.push(new am4charts.LineSeries());

        series1.dataFields.dateX = "date";
        series2.dataFields.dateX = "date";
        series3.dataFields.dateX = "date";
        series1.dataFields.valueY = "value1";
        series2.dataFields.valueY = "value2";
        series3.dataFields.valueY = "value3";
        series1.tooltipText = "Оптимистичный прогноз: {value1}% \n План: {value2}% \n Пессимистичный прогноз: {value3}%";

        series1.stroke = am4core.color("green");
        series2.stroke = am4core.color("blue");
        series3.stroke = am4core.color("red");

        x.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series1);
        scrollbarX.series.push(series2);
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
                    <div style={{width: '100%'}}>
                        Смешение даты начала проекта
                    </div>
                    <div style={{width: '80%', float: 'left'}}>
                        <Slider
                            min={-100}
                            max={100}
                            onChange={setFactor1}
                            value={factor1}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{width: '10%', float: 'left'}}>
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
                    <div style={{width: '100%'}}>
                        Бюджет
                    </div>
                    <div style={{width: '80%', float: 'left'}}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor2}
                            value={factor2}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{width: '10%', float: 'left'}}>
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
                    <div style={{width: '100%'}}>
                        Рабочие
                    </div>
                    <div style={{width: '80%', float: 'left'}}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor3}
                            value={factor3}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{width: '10%', float: 'left'}}>
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
                    <div style={{width: '100%'}}>
                        Материалы
                    </div>
                    <div style={{width: '80%', float: 'left'}}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={setFactor4}
                            value={factor4}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                    <div style={{width: '10%', float: 'left'}}>
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
