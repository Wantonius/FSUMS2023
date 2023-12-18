import {useState} from 'react';

const ContactForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			firstname:state.firstname,
			lastname:state.lastname,
			email:state.email,
			phone:state.phone,
			id:0
		}
		props.addContact(contact);
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="firstname">First Name</label>
			<input type="text"
					name="firstname"
					id="firstname"
					onChange={onChange}
					value={state.firstname}/>
			<br/>
			<label htmlFor="lastname">Last Name</label>
			<input type="text"
					name="lastname"
					id="lastname"
					onChange={onChange}
					value={state.lastname}/>
			<br/>
			<label htmlFor="email">Email</label>
			<input type="email"
					name="email"
					id="email"
					onChange={onChange}
					value={state.email}/>
			<br/>
			<label htmlFor="phone">Phone</label>
			<input type="tel"
					name="phone"
					id="phone"
					onChange={onChange}
					value={state.phone}/>
			<br/>
			<input type="submit" value="Add"/>
		</form>
	)
	
}

export default ContactForm;