import {useState} from 'react';
import {View,Pressable,Text,TextInput,StyleSheet} from 'react-native'

const GreetingForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		textColor:"",
		backgroundColor:""
	})
	
	const setGreeting = () => {
		let data = {
			...state
		}
		props.setGreeting(data);
		props.navigation.navigate("GreetingPage");
	}
	
	return(
		<View style={styles.container}>
			<View style={styles.row}>
				<Text>First Name:</Text>
				<TextInput style={styles.textInput}
					onChangeText={(text) => {
						setState((state) => {
							return{
								...state,
								firstname:text
							}
						})
					}}/>
			</View>
			<View style={styles.row}>
				<Text>Last Name:</Text>
				<TextInput style={styles.textInput}
					onChangeText={(text) => {
						setState((state) => {
							return{
								...state,
								lastname:text
							}
						})
					}}/>
			</View>
			<View style={styles.row}>
				<Text>Text Color:</Text>
				<TextInput style={styles.textInput}
					onChangeText={(text) => {
						setState((state) => {
							return{
								...state,
								textColor:text
							}
						})
					}}/>
			</View>
			<View style={styles.row}>
				<Text>Background Color:</Text>
				<TextInput style={styles.textInput}
					onChangeText={(text) => {
						setState((state) => {
							return{
								...state,
								backgroundColor:text
							}
						})
					}}/>
			</View>
			<View style={[styles.row,styles.buttonRow]}>
				<Pressable style={styles.button}
					onPress={setGreeting}>
					<Text>Set Greeting</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space_between"
	},
	buttonRow:{
		justifyContent:"center"
	},
	button:{
		height:80,
		width:110,
		backgroundColor:"green",
		alignItems:"center",
		justifyContent:"center"
	},
	textInput:{
		backgroundColor:"lightblue",
		width:200
	}
})

export default GreetingForm;