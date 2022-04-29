// import axios from 'axios';


// export const retrieveSensorData = async () => {
// function seconds_since_epoch(d){ 
//     return Math.floor( d / 1000 ); 
// }
// let d = new Date(Date.now());
// const sec = seconds_since_epoch(d) ;
// let yesterday = new Date();
// yesterday.setHours(0,0,0,1);
// yesterday = Math.floor(yesterday.valueOf()/1000)

// let weatherStatus = {
//     pm1: 0,
//     pm2: 0,
//     temperature: 0,
//     humidity: 0,
//     pressure: 0,
// }
// let totalReadings = 0
// const data = await axios.get(`https://h2801469.stratoserver.net/get.php?id=2475238&from=${yesterday}&to=${sec}&minimize=false&with_gps=true&with_note=true`)
// const result = data.data

// for (const res of result) {
//     weatherStatus["pm1"] += parseInt(res.p1)
//     weatherStatus["pm2"] += parseInt(res.p2)
//     weatherStatus["temperature"] += parseInt(res.t)
//     weatherStatus["humidity"] += parseInt(res.h)
//     weatherStatus["pressure"] += parseInt(res.p)
//     totalReadings += 1
// }

// for (const value in weatherStatus) {
//     if (value !== "pressure"){
//         weatherStatus[value] = (weatherStatus[value] / totalReadings).toFixed(2)
//     }else{
//         const data = Math.trunc(weatherStatus[value]/ totalReadings).toPrecision() 
//         weatherStatus[value] = data.substring(0,4) + "."+ data.substring(4, data.length)
//     }
// }

// return weatherStatus
// }

