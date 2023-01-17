import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartViewer from '../components/chart';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cache } from './_app';

interface FetchData {
  setTemperature: React.Dispatch<React.SetStateAction<null>>;
  setData: React.Dispatch<React.SetStateAction<null>>;
}

const fetchData = async ({ setTemperature, setData }: FetchData) => {
  const yesterdayTime: number = Math.floor(
    new Date().setHours(0, 0, 0, 1) / 1000,
  );
  const todayTime: number = Math.floor(Date.now() / 1000);
  if (cache.get(`${yesterdayTime}-${todayTime}-chartData`)) {
    const data = cache.get(`${yesterdayTime}-${todayTime}-chartData`);
    console.log(`> Smart implementation of cache!`);
    setTemperature(data[data.length - 1].t);
    setData(data);
    toast.success('Dados obtidos com sucesso!');
    return;
  } else {
    try {
      const { data } = await axios.get(
        `https://h2801469.stratoserver.net/get.php?id=2475238&from=${yesterdayTime}&to=${todayTime}&minimize=false&with_gps=true&with_note=true`,
      );
      setTemperature(data[data.length - 1].t);
      setData(data);
      cache.set(`${yesterdayTime}-${todayTime}-chartData`, data);
      toast.success('Dados obtidos com sucesso!');
    } catch (err) {
      console.groupCollapsed('> Error found');
      console.error('> Error details: ', err);
      console.groupEnd();
      toast.error('Ocorreu um erro ao tentar receber dados!');
    }
  }
};

const Home = () => {
  const router = useRouter();
  const [temperature, setTemperature] = useState(null);
  const [data, setData] = useState(null);
  const [currentDate] = useState<any>(null);

  useEffect(() => {
    fetchData({ setTemperature, setData });
  }, []);

  return (
    <div>
      <div
        id="temperature_display"
        className="text-center mt-auto col-12 mb-3 mb-sm-0"
      >
        <h1 className="text-center">Qualidade do ar na Marinha Grande</h1>
        <div
          className="alert alert-danger container"
          role="alert"
        >
          Devido a um problema técnico o nosso{' '}
          <a href="/temperatura">sensor de temperatura</a> deixou de funcionar,
          estamos a tentar resolver o problema...
        </div>
        <h2 className="text-center">
          Temperatura atual: {temperature && temperature}ºC
        </h2>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success"
          onClick={() => router.reload()}
        >
          Atualizar dados
        </button>
      </div>
      <ToastContainer />
      <div
        style={{ width: '100%', height: '80vh' }}
        id="chart"
        className="mb-9"
      >
        {data && (
          <ChartViewer
            data={data}
            date={currentDate}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
