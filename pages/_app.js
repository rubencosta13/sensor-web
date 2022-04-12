import React from 'react';
import Head from 'next/head'
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import '../components/global-style.module.css';

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