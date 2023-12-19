const RemoveRow = (props) => {

	return (
		<tr>
			<td>{props.contact.firstname}</td>
			<td>{props.contact.lastname}</td>
			<td>{props.contact.email}</td>
			<td>{props.contact.phone}</td>
			<td><button className="btn btn-danger" onClick={() => props.changeMode("cancel",0)}>Cancel</button></td>
			<td><button className="btn btn-success" onClick={() => props.removeContact(props.contact.id)}>Confirm</button></td>
		</tr>
	)
}

export default RemoveRow;