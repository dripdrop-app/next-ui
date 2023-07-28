import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import * as env from '@dripdrop/env';

type GetRootServerSideProps = {
	(context: GetServerSidePropsContext, authenticatedUser: true): Promise<GetServerSidePropsResult<{ user: User }>>;
	(context: GetServerSidePropsContext, authenticatedUser: false): Promise<
		GetServerSidePropsResult<{ user: User | null }>
	>;
	(context: GetServerSidePropsContext, authenticatedUser?: undefined): Promise<
		GetServerSidePropsResult<{ user: User }>
	>;
	(context: GetServerSidePropsContext, authenticatedUser: boolean): Promise<
		GetServerSidePropsResult<{ user: User | null }>
	>;
};

export const getRootServerSideProps: GetRootServerSideProps = async (context, authenticateUser = true) => {
	if (context.req.url && context.req.headers.host) {
		const url = new URL(context.req.url, `http://${context.req.headers.host}`);
		try {
			const response = await fetch(new URL('/api/auth/session', env.API_SERVER_URL), {
				headers: Object(context.req.headers),
			});
			if (response.status === 200) {
				if (url.pathname === '/login') {
					const redirect = url.searchParams.get('redirect') ?? '/';
					return { redirect: { statusCode: 302, destination: redirect } };
				}
				return { props: { user: await response.json() } };
			}
		} catch (e) {}
		if (authenticateUser) {
			if (url.pathname !== '/login') {
				const redirect = `${url.pathname}${url.search}`;
				const searchParams = new URLSearchParams();
				searchParams.append('redirect', redirect);
				return { redirect: { statusCode: 302, destination: `/login?${searchParams.toString()}` } };
			}
		}
	}

	return { props: { user: null } };
};

export const withRootServerSideProps = <T>(
	getServerSideProps: (
		context: GetServerSidePropsContext
	) => Promise<GetServerSidePropsResult<T>> | GetServerSidePropsResult<T>,
	authenticateUser: boolean = true
) => {
	return async (context: GetServerSidePropsContext) => {
		const [layoutServerSideProps, componentServerSideProps] = await Promise.all([
			getRootServerSideProps(context, authenticateUser),
			getServerSideProps(context),
		]);

		if ('redirect' in layoutServerSideProps || 'notFound' in layoutServerSideProps) {
			return layoutServerSideProps;
		}

		if ('notFound' in componentServerSideProps || 'redirect' in componentServerSideProps) {
			return componentServerSideProps;
		}

		return {
			props: {
				...(await layoutServerSideProps.props),
				...(await componentServerSideProps.props),
			},
		};
	};
};
