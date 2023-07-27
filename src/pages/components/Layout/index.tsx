import { ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

interface LayoutProps {
	children: ReactElement;
	user: User | null;
}

const Layout = ({ children, user }: LayoutProps) => {
	const [openSideBar, handlers] = useDisclosure(false);

	return (
		<AppShell
			navbarOffsetBreakpoint="sm"
			header={<AppHeader showBurger={!!user && openSideBar} toggle={handlers.toggle} />}
			navbar={user ? <AppNavbar opened={openSideBar} close={handlers.close} /> : undefined}
		>
			{children}
		</AppShell>
	);
};

export default Layout;
