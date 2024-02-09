import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

interface Props {
	children:React.ReactNode;
}

const Paragraph = (props:Props) => {
	
	const theme = useContext(ThemeContext);
	
	return(
		<p style={{
			"color":theme.color,
			"backgroundColor":theme.backgroundColor
		}}>
		{props.children}
		</p>
	)
}

export default Paragraph;