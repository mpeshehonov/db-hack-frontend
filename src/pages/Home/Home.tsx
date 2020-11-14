import React, {useEffect, useState} from 'react';
import {PageHeader} from "antd";
import {request} from "../../shared/utils/api";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    request('', {
      method: 'GET'
    })
      .then((r) => r.json())
      .then((r) => setData(r));

    console.log(data);
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Главная"
        subTitle="Система для строительных компаний"
      />
    </>
  );
};

export default Home;
