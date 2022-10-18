import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartViewer from "../components/chart";
import { useRouter } from 'next/router';
import Script from 'next/dist/client/script';
import { BrowserView, isBrowser, MobileView} from 'react-device-detect';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [orientation, setOrientation] = useState(null);
  const [transformCss, setTransformCss] = useState("rotate(0)");
  const router = useRouter();
  const [temperature, setTemperature] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const fetchPosts = async () => {
    // @ts-ignore
    const currentDate = Math.floor(new Date(Date.now()) / 1000);
    
    try {
      const data = await axios.post(`https://h2801469.stratoserver.net/get.php?id=2475238&from=${currentDate-1000}&to=${currentDate}&minimize=false&with_gps=true&with_note=true`);
      setTemperature(data.data[data.data.length -1].t);
      setTimestamp(data.data[data.data.length -1].time);
    } catch(err) {     
      console.group();
        console.log("> Error found...\nReloading Page...");
        console.error("> Error details: ", err);
      console.groupEnd();
      toast.error("Ocorreu um erro ao tentar receber dados!");
    }
  };
  useEffect(() => {
    // @ts-ignore
    setOrientation((screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation);
    fetchPosts()
  }, []);
  return (

    <div>
      <div id="temperature_display" className="text-center mt-auto col-12 mb-3 mb-sm-0">
        <h1 className="text-center">Qualidade do ar na Marinha Grande</h1>
        <h2 className="text-center">Temperatura atual: {temperature && temperature}ºC</h2>
        <div className="text-center">Dados de: {new Date( timestamp *1000).toLocaleString()}</div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success"
          // @ts-ignore
          onClick={() => router.reload(window.location.pathname)}
        >Atualizar dados</button>
      </div>
      <ToastContainer />
      <div style={{width:'100%', height:'80vh'}} id="chart" className="mb-9">
        <ChartViewer />
      </div>
    </div>
  );
};


export default Home

  
