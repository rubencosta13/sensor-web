import { CacheContext } from './_app';
import React, { useContext } from 'react';

const CacheViewer = () => {
  const cache = useContext(CacheContext);

  cache.set('test', 'hello');
  console.log(cache);
  return (<h1>Hello World</h1>);
};

export default CacheViewer;