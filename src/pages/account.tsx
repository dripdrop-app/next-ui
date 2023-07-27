import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Container, Stack, TextInput, Checkbox, Button } from '@mantine/core';
import Link from 'next/link';
import Head from 'next/head';
import useSWRMutation from 'swr/mutation';

import { getRootServerSideProps } from './utils/auth';

const AccountPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	if (!user) {
		return null;
	}
	return (
		<>
			<Head>
				<title>Account | dripdrop</title>
			</Head>
			<Container>
				<Stack spacing="md">
					<TextInput label="Email" value={user.email} readOnly />
					<Checkbox label="Admin" checked={user.admin} readOnly />
					<Button component={Link} href="/terms">
						Terms of Service
					</Button>
					<Button component={Link} href="/privacy">
						Privacy Policy
					</Button>
					<Button variant="light" color="red">
						Logout
					</Button>
				</Stack>
			</Container>
		</>
	);
};

export const getServerSideProps = getRootServerSideProps;

export default AccountPage;
