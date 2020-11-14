import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {PageHeader, InputNumber} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4pluginsForceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import {request} from "../../shared/utils/api";

am4core.useTheme(am4themesAnimated);

const Home = () => {
  const chartRef = useRef({data: {}, validateData () {}});

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);

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

    nodeTemplate.events.on("over", (event: any ) => {
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

    if (id === 0) {
      setInterval(() => {
        request('', {
          method: 'GET'
        }).then((r) => setData(r));
      }, 15 * 1000);
    }
  }, [id]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Главная"
      />
      Идентификатор задачи:&nbsp;&nbsp;
      <InputNumber min={0} max={10} onChange={(value: any) => setId(value)} value={id} />
      <div id="chart" style={{ width: "100%", height: "600px" }}/>
    </>
  );
};

export default Home;
