const Label = (props) => {

	let labelStyle = {
		fontFamily:"sans-serif",
		fontWeight:"bold",
		margin:0,
		padding:13
	}
	return (
		<p style={labelStyle} onClick={props.onColorChange}>{props.color}</p>
	)
}

export default Label;