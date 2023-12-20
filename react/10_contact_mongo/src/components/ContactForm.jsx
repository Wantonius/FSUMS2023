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
			...state
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
		<div style={{
			margin:"auto",
			width:"40%",
			textAlign:"center",
			backgroundColor:"lightblue"
		}}>
			<form className="mb-5" onSubmit={onSubmit}>
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
				<input type="submit" className="btn btn-secondary" value="Add Contact"/>
			</form>
		</div>
	)
}

export default ContactForm;