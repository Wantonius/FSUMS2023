import {Link} from 'react-router-dom';

const Navbar = (props) => {
	
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<p className="navbar-brand" style={{marginLeft:10}}>Contacts</p>
			<ul className="navbar-nav">
				<li className="nav-item" style={{marginLeft:10}}>
					<Link className="nav-item" to="/">Contacts</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link className="nav-item" to="/form">Add new contact</Link>
				</li>
			</ul>
		</nav>
	
	)
}

export default Navbar;