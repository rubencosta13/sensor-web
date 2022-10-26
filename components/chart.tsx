
import React, { useState, useEffect, lazy } from 'react';
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface params {
    setCss?: string;
    data: any;
    date: any;
};
interface dataParams {
    p1: number;
    p2: number;
    t: number;
    h: number;
    p: number;
    time: number;
}

const dataForm = {
    labels: [],
    datasets: [
        {
            label: 'PM 10',
            measurement: ' μg/m3',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'PM 2.5',
            measurement: ' μg/m3',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 69, 192)',
            tension: 0.1
        },
        {
            label: 'Temperatura',
            measurement: 'ºC',
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
            measurement: ' kPa',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 255, 90)',
            tension: 0.1
        }
    ]
};

const dataPlotter = (data: Array<dataParams>) => {
    for (const values of data) {
        dataForm.datasets[0].data.push(values.p1);
        dataForm.datasets[1].data.push(values.p2);
        dataForm.datasets[2].data.push(values.t);
        dataForm.datasets[3].data.push(values.h);
        dataForm.datasets[4].data.push(Math.floor((values.p / 1000)).toFixed(2));
        dataForm.labels.push(new Date(values.time *1000).toLocaleString().split(',')[1])
    }
    return {
        dataForm
    }
}

const ChartViewer = ({ data }: params) => {    
    const [css, setCss] = useState("spinner-border");
    const [chartData, setChartData] = useState(dataForm)
    useEffect(() => {
        if (data) {
            setCss('');
            const values = dataPlotter(data).dataForm;
            // console.log(data);
            setChartData(values)
        }
    }, []);
    return (
    <div>   
        <h3 className="title text-center" style={{marginTop: "1.5rem"}}>Informações detalhadas de {new Date().toLocaleDateString()}</h3>
            <br></br>
        <div className={css} role="status">
        <Line
            data={chartData}
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
                                const labelData = dataForm.datasets.filter(data => data.label == label);
                                if (label) {
                                    label += `: ${context.parsed.y}${labelData[0].measurement}`
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