import { retrieveSensorData } from "../api/date";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartViewer from "../components/chart";
import styles from '../components/global-style.module.css'



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
    return (
      <div>
        <div id="temperature_display" className="text-center mt-auto col-12 mb-3 mb-sm-0">
          <h1 className="text-center">Temperatura atual: {temperature && temperature}ºC</h1>
          <p className="text-center">Dados de: {new Date( timestamp *1000).toLocaleString()}</p>

        </div>
        
        <div style={{width:'100%', height:'80vh'}}>
          <ChartViewer/>
        </div>
          
      </div>
    );
};

export default Home

  