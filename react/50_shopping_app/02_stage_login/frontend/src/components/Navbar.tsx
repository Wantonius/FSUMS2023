import {Link} from 'react-router-dom';

interface Props {
	isLogged:boolean;
	user:string;
	logout():void;
}

const Navbar = (props:Props) => {

	if(props.isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form" className="nav-link">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p style={{"backgroundColor":"blue"}} className="nav-link">Logged in as {props.user}</p>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" onClick={props.logout} className="nav-link">Logout</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
				</ul>
			</nav>		
		)
	}
}

export default Navbar;