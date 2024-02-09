import React,{useState} from 'react';
import User from '../models/User';
import useAction from '../hooks/useAction';

interface State {
	username:string;
	password:string;
}

const LoginPage = () => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const {register,login,setError} = useAction();
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onRegister = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			setError("Username must be atleast 4 and password 8 characters long");
			return;
		}
		let user = new User(state.username,state.password);
		register(user);
	}
	
	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			setError("Username must be atleast 4 and password 8 characters long");
			return;
		}
		let user = new User(state.username,state.password);
		login(user);
	}
	
	return(
		<div style={{"width":"40%","backgroundColor":"lightblue","margin":"auto","textAlign":"center"}}>
			<form className="m-3">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
						name="username"
						id="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						name="password"
						id="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>				
				<button className="btn btn-primary" style={{"marginRight":5}} onClick={onRegister}>Register</button>
				<button className="btn btn-primary" style={{"marginLeft":5}} onClick={onLogin}>Login</button>
			</form>
		</div>
	)
}

export default LoginPage;