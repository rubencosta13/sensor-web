
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const getData = async (setCss) => {
    console.log("> Retrieving data...")
    // @ts-ignore
    const currentDate: any = Math.floor(new Date(Date.now()) /1000)
    let yesterday: any = new Date();
    yesterday.setHours(0,0,0,1);
    yesterday = Math.floor(yesterday.valueOf()/1000)
    try {
        const sensorData = await axios.post(`https://h2801469.stratoserver.net/get.php?id=2475238&from=${yesterday}&to=${currentDate}&minimize=false&with_gps=true&with_note=true`)
        console.log(sensorData)
        if (sensorData) {
            console.log("> Data gathered, loading graph...")
            setCss("")
        }else{
            throw new Error("> Erro ao obter dados... ")
        }
        const result = sensorData.data
        for (const res of result) {
            data.datasets[0].data.push(res.p1)
            data.datasets[1].data.push(res.p2)
            data.datasets[2].data.push(res.t)
            data.datasets[3].data.push(res.h)
            data.labels.push(new Date(res.time *1000).toLocaleString().split(',')[1])
        }
        toast.success('Dados obtidos...', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });  
    } catch (err) {
        toast.error('Erro ao obter os dados...', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });       
        console.log("> Retrieving data failed...\nSecond Attempt");
        setTimeout(() => {
            getData(setCss);
        },1500)
    }
    console.log("> Data retrieved and sanitized ✅");
}

const data = {
    labels: [],
    datasets: [
        {
            label: 'PM 10',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'PM 2.5',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 69, 192)',
            tension: 0.1
        },
        {
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 69, 192)',
            tension: 0.1,

        },
        {
            label: 'Humidade',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 123, 254)',
            tension: 0.1
        }
        // {
        //     label: "Pressão",
        //     data: [],
        //     fill: false,
        //     borderColor: 'rgb(255, 255, 90)',
        //     tension: 0.1
        // }
    ]
}

const ChartViewer = () => {    
    const [css, setCss] = useState("spinner-border");
    useEffect(() => {
        getData(setCss)
    }, []);
    return (
    <div>   
        <h3 className="title text-center" style={{marginTop: "1.5rem"}}>Informações detalhadas de {new Date().toLocaleDateString()}</h3>
            <br></br>
        <ToastContainer />
        <div className={css} role="status">
        <Line
            data={data}
            style={{flex:1,justifyContent:'center',alignItems: 'center',  textAlign: 'center', transform: [{ rotate: 30}]}}
            options={{
                responsive: true,
                maintainAspectRatio: true
            }}
            />
        </div>
        <div className='footer'>
            <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3" style={{"backgroundColor": "#00001"  }}>
                © 2022 Copyright: &nbsp;
                <a className="text-dark" href="https://github.com/rubencosta13">Rúben Costa</a>
            </div>
            </footer>
        </div>
    </div>
    );
};


export default ChartViewer