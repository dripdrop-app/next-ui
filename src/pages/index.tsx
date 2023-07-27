import Head from 'next/head';
import { getRootServerSideProps } from './utils/auth';

const HomePage = () => {
	return (
		<>
			<Head>
				<title>dripdrop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>Test</main>
		</>
	);
};

export const getServerSideProps = getRootServerSideProps;

export default HomePage;
