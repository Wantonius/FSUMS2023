import React from 'react';

interface Props {
	children:React.ReactNode;
}

const ContactCard = (props:Props) => {
	
	const cardStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:200,
		width:150,
		margin:10,
		textAlign:"center"
	}
	
	return (
		<div style={cardStyle}>
			{props.children}
		</div>
	)
}

export default ContactCard;