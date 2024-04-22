import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import {useState} from 'react';

export default function App() {
	const [state,setState] = useState({
		message:"No button pressed yet"
	})
	
	const changeMessage = (id) => {
		setState({
			message:"You pressed button nro "+id
		})
	}
	
	return (
		<View style={styles.mainWindow}>
			<View style={styles.textWindow}>
				<Text>{state.message}</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.buttonColumn}>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(1)}>
						<Text>1</Text>
					</Pressable>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(3)}>
						<Text>3</Text>
					</Pressable>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(5)}>
						<Text>5</Text>
					</Pressable>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(7)}>
						<Text>7</Text>
					</Pressable>
				</View>
				<View style={styles.buttonColumn}>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(2)}>
						<Text>2</Text>
					</Pressable>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(4)}>
						<Text>4</Text>
					</Pressable>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(6)}>
						<Text>6</Text>
					</Pressable>
					<Pressable style={styles.blueButton}
						onPress={() => changeMessage(8)}>
						<Text>8</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  mainWindow:{
	  flex:1
  },
  textWindow:{
	  flex:1,
	  justifyContent:"center",
	  alignItems:"center"
  },
  container: {
    flex: 10,
	backgroundColor:"#fff",
	flexDirection:"row"
  },
  buttonColumn: {
	  flex:1,
	  alignItems:"center",
	  justifyContent:"space-around"
  },
  blueButton: {
	  backgroundColor:"lightblue",
	  alignItems:"center",
	  justifyContent:"center",
	  width:50,
	  height:50
  },
});
