import React, { useContext } from 'react';
import DatePicker from '../components/datePicker';
import { CacheContext } from './_app';

const AdvancedViewer = () => {
  const cache = useContext(CacheContext);
  cache.set('hello', 'advancedView');
  return (
    <div className="container justify-center text-center mb-10 col-12 mb-3 mb-sm-0">
      <h1>Exportar Dados</h1>
      <div className="mb-10">
        Selecione um dia ou vários dias para obter um relatório em formato .CSV
        com os dados desse/s dia/s
      </div>
      <DatePicker />
    </div>
  );
};

export default AdvancedViewer;
