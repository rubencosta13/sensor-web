import React, { useEffect, useState } from 'react';

interface Particulate {
  pm2: number;
  pm10: number;
}

const evaluatePm = (pm2: number, pm10: number, setEvaluation: any) => {
  const evaluation = {
    'Muito Bom': {
      pm10: [0, 20],
      pm2: [0, 10],
    },
    Bom: {
      pm10: [21, 35],
      pm2: [11, 20],
    },
    Médio: {
      pm10: [36, 50],
      pm2: [21, 25],
    },
    Fraco: {
      pm10: [51, 100],
      pm2: [26, 50],
    },
    Mau: {
      pm10: [101, 1200],
      pm2: [51, 800],
    },
  };
  for (const [key, value] of Object.entries(evaluation)) {
    if (pm10 >= value.pm10[0] && pm10 <= value.pm10[1]) {
      setEvaluation(key);
    }
  }
};

const PmEvaluator = ({ pm2, pm10 }: Particulate) => {
  const [pmEvaluation, setEvaluation] = useState('');
  useEffect(() => {
    evaluatePm(pm2, pm10, setEvaluation);
  }, []);
  return (
    <div>
      <div className="container">{pmEvaluation && pmEvaluation}</div>
    </div>
  );
};

export default PmEvaluator;
