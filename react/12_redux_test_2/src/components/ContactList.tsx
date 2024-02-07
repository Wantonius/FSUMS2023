import {useDispatch,useSelector} from 'react-redux';
import {AppState} from '../reducers/contactReducer';

const ContactList = () => {
	
	const dispatch = useDispatch();
	
	const listSelector = (state:AppState) => state.list;
	
	const list = useSelector(listSelector);
	
	const contacts = list.map((contact) => {
		return (
			<tr key={contact.id}>
				<td>{contact.firstname}</td>
				<td>{contact.lastname}</td>
				<td>{contact.email}</td>
				<td>{contact.phone}</td>
				<td><button className="btn btn-danger" onClick={() => {
					dispatch({
						type:"REMOVE_CONTACT",
						payload:contact.id
					})
				}}>Remove</button></td>
			</tr>
		)
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
			{contacts}
			</tbody>
		</table>
	)
	
}

export default ContactList;