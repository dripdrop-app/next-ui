import { Header, Flex, MediaQuery, Burger, Avatar, Title } from '@mantine/core';

interface AppHeaderProps {
	showBurger: boolean;
	toggle: () => void;
}

const AppHeader = (props: AppHeaderProps) => {
	const { showBurger, toggle } = props;

	return (
		<Header sx={(theme) => ({ backgroundColor: theme.colors.blue[8] })} height={{ base: 65 }}>
			<Flex align="center" direction="row" sx={{ height: '100%' }} mx="lg">
				<MediaQuery largerThan="sm" styles={{ display: 'none' }}>
					<Burger opened={showBurger} onClick={toggle} />
				</MediaQuery>
				<Avatar
					alt="dripdrop"
					src="https://usc1.contabostorage.com/19b52af42e554105863370e19f11eae4:assets/dripdrop.png"
				/>
				<Title color="white" order={3} weight={600}>
					dripdrop
				</Title>
			</Flex>
		</Header>
	);
};

export default AppHeader;
