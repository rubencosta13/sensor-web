import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import type { AppProps } from 'next/app';
import '../styles/index.css';

const cache = new Map();


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Qualidade do ar na Marinha Grande"
        />
        <meta
          property="og:description"
          content="Plataforma de monitorização da qualidade do ar na Marinha Grande, Leiria. Sensor de monitorização da escola Secundária Pinhal do Rei"
        />
        <meta
          name="title"
          content="Qualidade do ar na Marinha Grande"
        />
        <meta
          name="description"
          content="Plataforma de monitorização da qualidade do ar na Marinha Grande, Leiria. Sensor de monitorização da escola Secundária Pinhal do Rei"
        />
        <meta
          name="keywords"
          content="Qualidade do Ar, Marinha Grande, IPMA, leiria, sensor de particulas, ESPR, pinhal do rei"
        />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=utf-8"
        />
        <meta
          name="language"
          content="Portuguese"
        />
        <meta
          name="revisit-after"
          content="2 days"
        />
        <meta
          name="author"
          content="Ruben Lavos Costa"
        />
        <meta
          name="yandex-verification"
          content="75168f966d0e5eee"
        />
        <link
          rel="shortcut icon"
          href="https://www.cm-mgrande.pt/assets/cmmgrande/cmmgrande/images/favicon.ico"
        />
        <title>Qualidade do ar na Marinha Grande</title>
        <script
          async
          src="https://www.googleoptimize.com/optimize.js?id=OPT-NNG4M4B"
        ></script>
        <meta
          name="google-site-verification"
          content="01GcahiJ-eCHp7RzZLZ8M_GXL_bg1jSX9oFgouFGpUA"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Layout>
        <div></div>
        <GoogleAnalytics measurementId="G-KC26BBGRR9" />
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export { cache };
export default MyApp;
