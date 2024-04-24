import {useContext} from 'react';
import {View,Text,Pressable,StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';

const ThemeButton = (props) => {
	
	const theme = useContext(ThemeContext);
	
	const styles = StyleSheet.create({
		button: {
			width:160,
			height:80,
			backgroundColor:theme.background,
			alignItems:"center",
			justifyContent:"center"
		},
		text:{
			fontFamily:"sans-serif",
			fontSize:16,
			margin:10,
			color:theme.textcolor
		}
	})
	return(
		<Pressable style={styles.button}
			onPress={props.toggleTheme}>
			<Text style={styles.text}>Toggle Theme</Text>
		</Pressable>
	)
	
}

export default ThemeButton;