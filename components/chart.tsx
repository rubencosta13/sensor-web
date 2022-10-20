
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
        console.groupCollapsed('> Raw data');
        console.log(sensorData);
        console.groupEnd();
        if (!sensorData) {
            console.group();
            console.log('Data: ');
            console.log(sensorData.data);
            console.groupEnd();
            throw new Error("> Erro ao obter dados... ")
        } else {
            console.log("> Data gathered, loading graph...")
            setCss("")
            const result = sensorData.data
            for (const res of result) {
                data.datasets[0].data.push(res.p1);
                data.datasets[1].data.push(res.p2);
                data.datasets[2].data.push(res.t);
                data.datasets[3].data.push(res.h);
                data.datasets[4].data.push((res.p / 1000).toFixed(2));
                data.labels.push(new Date(res.time *1000).toLocaleString().split(',')[1])
            }
        }
    } catch (err) { 
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
            measurement: 'μg/m3',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'PM 2.5',
            measurement: 'μg/m3',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 69, 192)',
            tension: 0.1
        },
        {
            label: 'Temperatura',
            measurement: 'º.C',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 69, 192)',
            tension: 0.1,

        },
        {
            label: 'Humidade',
            measurement: '%',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 123, 254)',
            tension: 0.1
        },
        {
            label: "Pressão",
            measurement: 'kPa',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 255, 90)',
            tension: 0.1
        }
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
        <div className={css} role="status">
        <Line
            data={data}
            style={{flex:1,justifyContent:'center',alignItems: 'center',  textAlign: 'center'}}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                animation: false,
                spanGaps: true,
                showLine: true,    
                plugins: {
                    tooltip: {
                        callbacks: {
                            // @ts-ignore
                            label: function(context) {
                                let label = context.dataset.label;
                                const measurements = {
                                    'PM 10': ' μg/m3',
                                    'PM 2.5': ' μg/m3',
                                    'Temperatura': 'ºC',
                                    'Humidade': '%',
                                    'Pressão': ' kPa'
                                }
                                if (label) {
                                    label += `: ${context.parsed.y}${measurements[label]}`
                                }
                                return label;
                            }
                        }
                    }
                }
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