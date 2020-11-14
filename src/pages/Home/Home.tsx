import React, {useEffect, useState} from 'react';
import {PageHeader} from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4pluginsForceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import {request} from "../../shared/utils/api";

am4core.useTheme(am4themesAnimated);

const Home = () => {
  const [data, setData] = useState([]);

  const initChart = () => {
    const chart = am4core.create('chart', am4pluginsForceDirected.ForceDirectedTree);

    const networkSeries = chart.series.push(new am4pluginsForceDirected.ForceDirectedSeries())
    networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "name";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";

    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 8;
    networkSeries.linkWithStrength = 0;

    const nodeTemplate = networkSeries.nodes.template;
    nodeTemplate.tooltipText = "{name}";
    nodeTemplate.fillOpacity = 1;
    nodeTemplate.label.hideOversized = true;
    nodeTemplate.label.truncate = true;

    const linkTemplate = networkSeries.links.template;
    linkTemplate.strokeWidth = 1;
    const linkHoverState = linkTemplate.states.create("hover");
    linkHoverState.properties.strokeOpacity = 1;
    linkHoverState.properties.strokeWidth = 2;

    networkSeries.data = data;
  }
  
  useEffect(() => {
    request('', {
      method: 'GET'
    })
      .then((r) => setData(r))
      .then(() => initChart());
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Главная"
        subTitle="Система для строительных компаний"
      />
      <div id="chart" style={{ width: "100%", height: "600px" }}/>
    </>
  );
};

export default Home;
