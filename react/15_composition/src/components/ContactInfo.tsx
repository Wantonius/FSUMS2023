interface Props {
	name:string;
	profession:string;
}
const ContactInfo = (props:Props) => {
	return(
		<>
			<p>{props.name}</p>
			<p>{props.profession}</p>
		</>
	)
}

export default ContactInfo;