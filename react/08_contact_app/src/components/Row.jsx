const Row = (props) => {

	return (
		<tr>
			<td>{props.contact.firstname}</td>
			<td>{props.contact.lastname}</td>
			<td>{props.contact.email}</td>
			<td>{props.contact.phone}</td>
			<td><button className="btn btn-danger" onClick={() => props.changeMode("remove",props.index)}>Remove</button></td>
			<td><button className="btn btn-secondary" onClick={() => props.changeMode("edit",props.index)}>Edit</button></td>
		</tr>
	)
}

export default Row;