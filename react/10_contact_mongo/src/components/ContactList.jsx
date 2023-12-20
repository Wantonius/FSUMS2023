import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

const ContactList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeMode = (mode, index) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
		
	const removeContact = (id) => {
		props.removeContact(id);
		changeMode("cancel",0);
	}
	
	const editContact = (contact) => {
		props.editContact(contact);
		changeMode("cancel",0);
	}

	let contacts = props.list.map((contact,index) => {
		if(index === state.removeIndex) {
			return (<RemoveRow key={contact.id} contact={contact} index={index} changeMode={changeMode} removeContact={removeContact}/>)
		}
		if(index === state.editIndex) {
			return (<EditRow key={contact.id} contact={contact} index={index} changeMode={changeMode} editContact={editContact}/>)
		}
		return (<Row key={contact.id} contact={contact} index={index} changeMode={changeMode}/>)
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
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{contacts}
			</tbody>
		</table>
	)
}

export default ContactList;