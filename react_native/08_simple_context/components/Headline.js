import {useContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';

const Headline = (props) => {
	
	const theme = useContext(ThemeContext);
	
	const styles = StyleSheet.create({
		container: {
			flex:1,
			backgroundColor:theme.background,
			alignItems:"center",
			justifyContent:"center"
		},
		text:{
			fontFamily:"sans-serif",
			fontSize:28,
			color:theme.textcolor
		}
	})
	return(
		<View style={styles.container}>
			<Text style={styles.text}>{props.children}</Text>
		</View>
	)
	
}

export default Headline;