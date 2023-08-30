import Head from 'next/head';

import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/x-icon" href="/images/site/bsc-logo-icon.png"></link>
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
};

export default App;
