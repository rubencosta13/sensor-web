import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Script from 'next/dist/client/script';
import 'bootstrap/dist/css/bootstrap.css';



const MyApp = ({Component, pageProps}) => {
    return (
        <div>
            <Head>
                
                <title>Meteorologia Marinha Grande</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </div>
    );  
};

export default MyApp;