import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

const Layout = ({ children }: any) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
