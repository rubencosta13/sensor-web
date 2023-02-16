import React from 'react';
import { cache } from './_app';

const CacheViewer = () => {
  const tableRows = Array.from(cache).map(([key]) => (
    <tr key={key}>
      <td>{key}</td>
      <td>Value removed for optimization</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
};

export default CacheViewer;
  
  
  