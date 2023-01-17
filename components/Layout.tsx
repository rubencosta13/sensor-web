import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

type Props = {
  children: string | JSX.Element | JSX.Element[] | JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
