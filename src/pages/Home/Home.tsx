import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {PageHeader, InputNumber, Slider, Col, Row} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4pluginsForceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import {request} from "../../shared/utils/api";

am4core.useTheme(am4themesAnimated);

const Home = () => {
    const chartRef = useRef({
        data: {}, validateData() {
        }
    });

    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    const [factor1, setFactor1] = useState(0);

    const initChart = () => {
        const chart = am4core.create('chart', am4pluginsForceDirected.ForceDirectedTree);
        chart.zoomable = true;

        const networkSeries = chart.series.push(new am4pluginsForceDirected.ForceDirectedSeries())
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.children = "children";
        networkSeries.dataFields.color = "color";
        networkSeries.nodes.template.tooltipText = "{name}:{value}";
        networkSeries.nodes.template.fillOpacity = 1;
        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 8;
        networkSeries.linkWithStrength = 0;

        const nodeTemplate = networkSeries.nodes.template;
        nodeTemplate.tooltipText = "{name}";

        const linkTemplate = networkSeries.links.template;
        linkTemplate.strokeWidth = 1;

        const linkHoverState = linkTemplate.states.create("hover");
        linkHoverState.properties.strokeOpacity = 1;
        linkHoverState.properties.strokeWidth = 2;

        nodeTemplate.events.on("over", (event: any) => {
            const {dataItem} = event.target;
            dataItem.childLinks.each((link: any) => {
                // eslint-disable-next-line no-param-reassign
                link.isHover = true;
            })
        })

        nodeTemplate.events.on("out", (event: any) => {
            const {dataItem} = event.target;
            dataItem.childLinks.each((link: any) => {
                // eslint-disable-next-line no-param-reassign
                link.isHover = false;
            })
        })

        networkSeries.data = data;

        chartRef.current = chart;

        return () => {
            chart.dispose();
        };
    }

    useLayoutEffect(() => {
        initChart();
    }, []);

    useLayoutEffect(() => {
        chartRef.current.data = data;
    }, [data]);

    useEffect(() => {
        const url = id > 0 ? `?id=${id}` : '';

        request(url, {
            method: 'GET'
        }).then((r) => setData(r));
    }, [id]);

    const setColor = (factor: number) => {
        let color: string;
        if (factor === 0) (color = "#04ae00");
        if (factor === 1) (color = "#ffc1c1");
        if (factor === 2) (color = "#FFBB02");
        if (factor === 3) (color = "#FF9E30");
        if (factor === 4) (color = "#ff1d23");
        if (factor === 5) (color = "#c80d12");
        if (factor === 6) (color = "#b4090d");
        if (factor === 7) (color = "#a00003");
        // @ts-ignore
        return color;
    }

    useEffect(() => {
        const aaa = document.querySelectorAll("g[role='menuitem']");
        let dep: any;
        aaa.forEach(aa => {
            if (aa.innerHTML.includes('Департамент охраны труда')) {
                dep = aa;
                dep.setAttribute("fill", setColor(factor1));
            }
        })

    }, [factor1]);

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Главная"
            />
            <Row style={{margin: '30px 45px'}}>
                <Col span={12}>
                    Неделя:&nbsp;&nbsp;
                    <InputNumber min={0} max={10} onChange={(value: any) => setId(value)} value={id}/>
                </Col>
                <Col  span={3}>
                    Издержки / неустойка:
                </Col>
                <Col  span={8}>
                    <div style={{width: '80%', float: 'left'}}>
                        <Slider
                            min={0}
                            max={7}
                            onChange={setFactor1}
                            value={factor1}
                            style={{margin: '10px 0px'}}
                        />
                    </div>
                </Col>
                <Col  span={1}>
                    <div style={{width: '10%', float: 'left'}}>
                        <InputNumber
                            min={0}
                            max={7}
                            onVolumeChange={() => setFactor1}
                            value={factor1}
                            style={{margin: '0 10px', width: '60px'}}
                        />
                    </div>
                </Col>
            </Row>

            <div id="chart" style={{width: "100%", height: "600px"}}/>
        </>
    );
};

export default Home;
