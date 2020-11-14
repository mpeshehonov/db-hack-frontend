import React, {useEffect, useLayoutEffect, useState} from 'react';
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

    let selectedNode: any;

    networkSeries.nodes.template.events.on("up", (event: any) => {
      let node = event.target;
      if (!selectedNode) {
        node.outerCircle.disabled = false;
        node.outerCircle.strokeDasharray = "3,3";
        selectedNode = node;
      } else if (selectedNode === node) {
        node.outerCircle.disabled = true;
        node.outerCircle.strokeDasharray = "";
        selectedNode = undefined;
      } else {
        node = event.target;

        const link = node.linksWith.getKey(selectedNode.uid);

        if (link) {
          node.unlinkWith(selectedNode);
        }
        else {
          node.linkWith(selectedNode, 0.2);
        }
      }
    })
  }

  useLayoutEffect(() => {
    initChart();
  }, [data]);
  
  useEffect(() => {
    request('', {
      method: 'GET'
    }).then((r) => setData(r));
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
