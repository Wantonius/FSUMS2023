import {useState} from 'react';
import {Text,View,Pressable,Modal,StyleSheet} from 'react-native';

const ModalView = () => {
	
	const [state,setState] = useState({
		visible:false
	})
	
	return(
		<View style={styles.container}>
			<Modal
				animationType="fade"
				transparent={false}
				visible={state.visible}
				onRequestClose={() => {
					setState({
						visible:false
					})
				}}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Press to close</Text>
						<Pressable style={[styles.openButton,styles.closeButton]}
							onPress={() => setState({visible:false})}>
							<Text>Close</Text>
						</Pressable>
					</View>
			</Modal>
			<Pressable style={styles.openButton}
				onPress={() => setState({visible:true})}>
				<Text>Press to open</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	modalView:{
		margin:10,
		marginTop:200,
		backgroundColor:"lightblue",
		padding:20,
		alignItems:"center",
		justifyContent:"center",
		shadowColor:"#000",
		shadowOffset:{
			width:0,
			height:2
		},
		height:"30%",
		shadowOpacity:0.25,
		shadowRadius:4,
		elevation:5
	},
	openButton:{
		width:100,
		height:50,
		backgroundColor:"green",
		alignItems:"center",
		justifyContent:"center"
	},
	closeButton:{
		backgroundColor:"red"
	},
	modalText:{
		alignItems:"center",
		justifyContent:"center"
	}
})

export default ModalView;