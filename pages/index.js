import { retrieveSensorData } from "../api/date";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartViewer from "../components/chart";

const Home = () => {
    const [data, setData] = useState({});
    const [temperature, setTemperature] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const fetchPosts = async () => {
      const currentDate = Math.floor(new Date(Date.now()) / 1000) ;
      const res = await retrieveSensorData()
      setData(res);
      const data = await axios.post(`https://h2801469.stratoserver.net/get.php?id=2475238&from=${currentDate-1000}&to=${currentDate}&minimize=false&with_gps=true&with_note=true`)
      setTemperature(data.data[data.data.length -1].t)
      setTimestamp(data.data[data.data.length -1].time)
    };

    useEffect(() => {
      fetchPosts()
    }, []);
    const fields = ["PM 10", "PM 2.5", "Temperatura", "Humidade", "Pressão"]
    const tifOptions = Object.keys(data).map((key, index) => 
        <p key={key}><span className="font-weight-bold" key={key}>{fields[index]}:</span> {data[key]? data[key] : "Erro"}</p>
    )
    return (
      <div>
        <div id="temperature_display" className="text-center mt-auto col-12 mb-3 mb-sm-0">
          <h1 className="text-center">Temperatura atual: {temperature && temperature}ºC</h1>
          <p className="text-center">Dados de: {new Date( timestamp *1000).toLocaleString()}</p>

        </div>
        {/* <div>{tifOptions}</div> */}
        <div className="chart">
          <style jsx>{`
            .chart {
              position: relative;
              height:40vh; 
              width:80vw
            }
          `}</style>
          <ChartViewer/></div>
        
      </div>
    );
};

export default Home

  