import React,{useState} from 'react';
import Contact from '../models/Contact';
import {useDispatch} from 'react-redux';

interface State {
	firstname:string;
	lastname:string;
	email:string;
	phone:string;
}

const ContactForm = () => {
	
	const [state,setState] = useState<State>({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const dispatch = useDispatch();
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let contact = new Contact(state.firstname,state.lastname,state.email,state.phone,0);
		dispatch({
			type:"ADD_CONTACT",
			contact:contact
		});
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		});
	}
	
	return(
		<div style={{"width":"40%","backgroundColor":"pink","margin":"auto","textAlign":"center"}}>
			<form className="m-3" onSubmit={onSubmit}>
				<label htmlFor="firstname" className="form-label">First Name</label>
				<input type="text"
						name="firstname"
						id="firstname"
						className="form-control"
						onChange={onChange}
						value={state.firstname}/>
				<label htmlFor="lastname" className="form-label">Last Name</label>
				<input type="text"
						name="lastname"
						id="lastname"
						className="form-control"
						onChange={onChange}
						value={state.lastname}/>
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email"
						name="email"
						id="email"
						className="form-control"
						onChange={onChange}
						value={state.email}/>
				<label htmlFor="phone" className="form-label">Phone</label>
				<input type="tel"
						name="phone"
						id="phone"
						className="form-control"
						onChange={onChange}
						value={state.phone}/>						
				<input type="submit" className="btn btn-secondary" value="Add"/>
			</form>
		</div>
	)
	
}

export default ContactForm;