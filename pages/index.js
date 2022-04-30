import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartViewer from "../components/chart";
import { useRouter } from 'next/router';
import { BrowserView, isBrowser, MobileView} from 'react-device-detect';


const Home = () => {
  const [orientation, setOrientation] = useState(null);
  const router = useRouter();
  const [temperature, setTemperature] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const fetchPosts = async () => {
    const currentDate = Math.floor(new Date(Date.now()) / 1000) ;
    
    try {
      const data = await axios.post(`https://h2801469.stratoserver.net/get.php?id=2475238&from=${currentDate-1000}&to=${currentDate}&minimize=false&with_gps=true&with_note=true`);
      setTemperature(data.data[data.data.length -1].t);
      setTimestamp(data.data[data.data.length -1].time);
    } catch(err) {
      console.log("> Error found...\nReloading Page...");
      router.reload(window.location.pathname);
    }
  };
  useEffect(() => {
    setOrientation((screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation);
    fetchPosts()
  }, []);
  return (
    <div>
      <div id="temperature_display" className="text-center mt-auto col-12 mb-3 mb-sm-0">
        <h1 className="text-center">Temperatura atual: {temperature && temperature}ºC</h1>
        <div className="text-center">Dados de: {new Date( timestamp *1000).toLocaleString()}</div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success"
          onClick={() => router.reload(window.location.pathname)}
        >Atualizar dados</button>
      </div>
      <div style={{width:'100%', height:'80vh'}} id="chart">
      {(isBrowser) ? <ChartViewer/> : (orientation === "landscape-secondary" || orientation === "landscape-primary") ? <ChartViewer/>: <div className="d-flex justify-content-center">Rode o seu dispositivo e atualize a página para visualizar o gráfico<br/><button className="btn btn-danger" onClick={() => router.reload(window.location.pathname)}>Atualizar a página</button></div>}
      </div>
        
    </div>
  );
};


export default Home

  