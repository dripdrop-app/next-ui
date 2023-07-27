import { Navbar, NavLink } from '@mantine/core';
import Link from 'next/link';
import { BsYoutube } from 'react-icons/bs';
import { MdAccountCircle, MdCloudDownload, MdQueue, MdSubscriptions } from 'react-icons/md';

interface AppNavbarProps {
	opened: boolean;
	close: () => void;
}

const AppNavbar = (props: AppNavbarProps) => {
	const { opened, close } = props;

	return (
		<Navbar
			width={{ sm: 200 }}
			hiddenBreakpoint="sm"
			hidden={!opened}
			p="sm"
			sx={(theme) => ({
				'& .mantine-NavLink-icon': {
					color: theme.colors.blue[8],
				},
			})}
		>
			<Navbar.Section grow>
				<NavLink
					component={Link}
					href="/music/downloader"
					label="Music Downloader"
					onClick={close}
					icon={<MdCloudDownload />}
				/>
				<NavLink component={Link} href="/youtube/videos" label="Videos" onClick={close} icon={<BsYoutube />} />
				<NavLink
					component={Link}
					href="/youtube/subscriptions"
					label="Subscriptions"
					onClick={close}
					icon={<MdSubscriptions />}
				/>
				<NavLink component={Link} href="/youtube/videos/queue" label="Queue" onClick={close} icon={<MdQueue />} />
			</Navbar.Section>
			<Navbar.Section>
				<NavLink component={Link} href="/account" label="Account" onClick={close} icon={<MdAccountCircle />} />
			</Navbar.Section>
		</Navbar>
	);
};

export default AppNavbar;
