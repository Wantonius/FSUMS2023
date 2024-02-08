import React from 'react';

interface Props {
	header:React.ReactNode;
	media?:React.ReactNode;
	content:React.ReactNode;
}

const NamedChildren = (props:Props) => {
	
	
	const cardStyle:React.CSSProperties = {
		backgroundColor:"lightblue",
		height:200,
		width:150,
		margin:10,
		textAlign:"center"
	}
	
	return(
		<div style={cardStyle}>
			<>{props.header}</>
			{props.media? <>{props.media}</>:<></>}
			<>{props.content}</>
		</div>
	)
	
}

export default NamedChildren;