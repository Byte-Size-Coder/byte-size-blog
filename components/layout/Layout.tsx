import MainNavigation from './MainNavigation';

interface ILayoutProps {
	children: any;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
	return (
		<>
			<MainNavigation />
			<main>{children}</main>
		</>
	);
};

export default Layout;
