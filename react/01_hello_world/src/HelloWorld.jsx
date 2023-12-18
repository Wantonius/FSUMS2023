const HelloWorld = (props) => {

	let name = "World";
	if(props.name) {
		name = props.name;
	}
	return (
		<h1>Hello {name}</h1>
	)
}

export default HelloWorld;