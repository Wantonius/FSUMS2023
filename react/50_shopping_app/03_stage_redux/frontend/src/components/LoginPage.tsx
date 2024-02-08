import React,{useState} from 'react';
import User from '../models/User';
import {register,registerFailed,login} from '../actions/loginActions';
import {AppState,ShoppingAction} from '../types/states';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
interface Props {
	register(user:User):void;
	login(user:User):void;
	setError(error:string):void;
}

interface State {
	username:string;
	password:string;
}

const LoginPage = (props:Props) => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const dispatch:ThunkDispatch<AppState,null,ShoppingAction> = useDispatch();
	
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
			dispatch(registerFailed("Username needs to be 4 and password 8 characters long"));
			return;
		}
		let user = new User(state.username,state.password);
		dispatch(register(user));
	}
	
	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			dispatch(registerFailed("Username needs to be 4 and password 8 characters long"));
			return;
		}
		let user = new User(state.username,state.password);
		dispatch(login(user));
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