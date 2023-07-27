import { AppProps as NextAppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import Layout from './components/Layout';

type AppProps = NextAppProps<{ user: User | null }>;

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: 'dark',
				breakpoints: {
					xl: '2000',
				},
				components: {
					Anchor: {
						defaultProps: {
							target: '_blank',
							rel: 'noopener noreferrer',
						},
					},
					Flex: {
						defaultProps: {
							wrap: { base: 'wrap', sm: 'nowrap' },
							gap: 'md',
						},
					},
					Tooltip: {
						defaultProps: {
							events: { hover: true, focus: false, touch: true },
						},
					},
				},
			}}
		>
			<ModalsProvider>
				<Notifications position="top-center" />
				<Layout user={pageProps.user}>
					<Component {...pageProps} />
				</Layout>
			</ModalsProvider>
		</MantineProvider>
	);
};

export default App;
