
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import axios from 'axios';

const getData = async () => {
    console.log("> Retrieving data...")
    const currentDate = Math.floor(new Date(Date.now())/1000) 
    let yesterday = new Date();
    yesterday.setHours(0,0,0,1);
    yesterday = Math.floor(yesterday.valueOf()/1000)
    try {
        const sensorData = await axios.post(`https://h2801469.stratoserver.net/get.php?id=2475238&from=${yesterday}&to=${currentDate}&minimize=false&with_gps=true&with_note=true`)
        const result = sensorData.data
        for (const res of result) {
            data.datasets[0].data.push(res.p1)
            data.datasets[1].data.push(res.p2)
            data.datasets[2].data.push(res.t)
            data.datasets[3].data.push(res.h)
            data.labels.push(new Date(res.time *1000).toLocaleString().split(',')[1])
        }
    } catch (err) {
        console.log("> Retrieving data failed...\nSecond Attempt");
        getData();
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
    useEffect(() => {
        getData()
    }, []);
    return (
    <div>
        <h3 className="title text-center" style={{marginTop: "1.5rem"}}>Informações detalhadas de {new Date().toLocaleDateString()}</h3>
        <Line
        data={data}
        style={{flex:1,justifyContent:'center',alignItems: 'center',  textAlign: 'center'}}
        options={{
            font: 12,
            parsing: true,
            animations: true,
            responsive: true,
            maintainAspectRatio: true
        }}
        />
    </div>
    );
};


export default ChartViewer