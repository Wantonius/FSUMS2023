const Square = (props) => {

	const squareStyle = {
		backgroundColor:props.color,
		height:150
	}
	return (
		<div style={squareStyle}></div>
	)
}

export default Square;