import {Outlet,Link} from 'react-router-dom';

const HeaderLayout = (props) => {
	
	return (
		<>
			<ul style={{listStyleType:"none"}}>
				<li>
					<Link to="/">Home</Link>					
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
			<Outlet/>
		</>
	)
}

export default HeaderLayout;