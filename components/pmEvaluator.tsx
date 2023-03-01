/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

interface Particulate {
  pm2: number;
  pm10: number;
}

const evaluatePm = (
  pm2: number,
  pm10: number,
  setEvaluation: any,
  setColor: any,
) => {
  const evaluation = {
    'Muito Bom': {
      pm10: [0, 20],
      pm2: [0, 10],
      color: '#28d411',
    },
    Bom: {
      pm10: [21, 35],
      pm2: [11, 20],
      color: '#61db51',
    },
    Médio: {
      pm10: [36, 50],
      pm2: [21, 25],
      color: '#f5b540',
    },
    Fraco: {
      pm10: [51, 100],
      pm2: [26, 50],
      color: '#ffb326',
    },
    Mau: {
      pm10: [101, 1200],
      pm2: [51, 800],
      color: '#db0707',
    },
  };
  for (const [key, value] of Object.entries(evaluation)) {
    if (
      Math.trunc(pm10) >= value.pm10[0] &&
      Math.trunc(pm10) <= value.pm10[1] &&
      Math.trunc(pm2) >= value.pm2[0] &&
      Math.trunc(pm2) <= value.pm2[1]
    ) {
      setEvaluation(key);
      setColor(value.color);
    }
  }
};

const PmEvaluator = ({ pm2, pm10 }: Particulate) => {
  const [pmEvaluation, setEvaluation] = useState('');
  const [color, setColor] = useState('');
  useEffect(() => {
    evaluatePm(pm2, pm10, setEvaluation, setColor);
  }, []);
  return (
    <div className="container text-center">
      Classificação das PM:
      <br />
      <span style={{ backgroundColor: color }}>
        <strong>{pmEvaluation}</strong>
      </span>
    </div>
  );
};

export default PmEvaluator;
