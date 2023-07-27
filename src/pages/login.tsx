import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { Box, Button, Container, Flex, LoadingOverlay, PasswordInput, Stack, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { useEffect } from 'react';

import AlertConfirmation from './components/Display/AlertConfirmation';
import { getRootServerSideProps } from './utils/auth';

interface LoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const { data, isMutating, trigger, error } = useSWRMutation<
		AuthenticatedResponse,
		ApiErrorResponse,
		string,
		LoginForm
	>('/api/auth/login', (url, options) =>
		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(options.arg),
		}).then((res) => res.json() as Promise<AuthenticatedResponse>)
	);

	const router = useRouter();

	const { reset, handleSubmit, control } = useForm<LoginForm>({ reValidateMode: 'onSubmit' });

	useEffect(() => {
		if (!isMutating && data) {
			const searchParams = new URLSearchParams(window.location.search);
			const redirect = searchParams.get('redirect') ?? '/';
			router.push(redirect);
		}
	}, [data, isMutating, router]);

	return (
		<>
			<Head>
				<title>Login | dripdrop</title>
			</Head>
			<main>
				<LoadingOverlay visible={isMutating} />
				<Container sx={{ position: 'relative' }}>
					<Box component="form" onSubmit={handleSubmit((data) => trigger({ ...data }))}>
						<Stack p="md">
							<Controller
								name="email"
								control={control}
								defaultValue={''}
								rules={{ required: true }}
								render={({ field, fieldState }) => (
									<TextInput
										{...field}
										label="Email"
										placeholder="Enter Email"
										error={fieldState.error?.type === 'required' ? 'Required' : ''}
										required
										withAsterisk
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								defaultValue={''}
								rules={{ required: true }}
								render={({ field, fieldState }) => (
									<PasswordInput
										{...field}
										label="Password"
										placeholder="Enter Password"
										error={fieldState.error?.type === 'required' ? 'Required' : ''}
										required
										withAsterisk
									/>
								)}
							/>
							<AlertConfirmation showError={!!error} errorMessage={error?.detail} />
							<Flex gap="md">
								<Button type="submit">Submit</Button>
								<Button onClick={() => reset()}>Clear</Button>
							</Flex>
							<Button component={Link} href="/create" variant="outline">
								Create Account
							</Button>
						</Stack>
					</Box>
				</Container>
			</main>
		</>
	);
};

export const getServerSideProps = (context: GetServerSidePropsContext) => getRootServerSideProps(context, false);

export default Login;
