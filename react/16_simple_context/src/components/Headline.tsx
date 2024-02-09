import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

interface Props {
	children:React.ReactNode;
}

const Headline = (props:Props) => {
	
	const theme = useContext(ThemeContext);
	
	return(
		<h3 style={{
			"color":theme.color,
			"backgroundColor":theme.backgroundColor
		}}>
		{props.children}
		</h3>
	)
}

export default Headline;