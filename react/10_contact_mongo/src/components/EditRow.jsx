import {useState} from 'react';

const EditRow = (props) => {

	const [state,setState] = useState({
		firstname:props.contact.firstname,
		lastname:props.contact.lastname,
		email:props.contact.email,
		phone:props.contact.phone
	})

	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const editContact = () => {
		let contact = {
			...state,
			id:props.contact.id
		}
		props.editContact(contact);
	}
	return (
		<tr>
			<td><input type="text"
						name="firstname"
						id="firstname"
						onChange={onChange}
						className="form-control"
						value={state.firstname}/></td>
			<td><input type="text"
						name="lastname"
						id="lastname"
						onChange={onChange}
						className="form-control"
						value={state.lastname}/></td>
			<td><input type="email"
						name="email"
						id="email"
						onChange={onChange}
						className="form-control"
						value={state.email}/></td>
			<td><input type="tel"
						name="phone"
						id="phone"
						onChange={onChange}
						className="form-control"
						value={state.phone}/></td>
			<td><button className="btn btn-success" onClick={editContact}>Save</button></td>
			<td><button className="btn btn-danger" onClick={() => props.changeMode("cancel")}>Cancel</button></td>
		</tr>
	)
}

export default EditRow;