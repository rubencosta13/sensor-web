import React, { useState } from 'react';
import DatePicker from '../components/datePicker';

const AdvancedViewer = () => {
  const [date, setDate] = useState<string>();
  return (
    <div>
      <h1>Pick a date and get data</h1>
      <DatePicker />
    </div>
  );
};

export default AdvancedViewer;
