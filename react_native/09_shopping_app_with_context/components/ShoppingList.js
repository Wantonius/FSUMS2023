import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native';
import useAction from '../hooks/useAction';
import useAppState from '../hooks/useAppState';


const ShoppingList = (props) => {

	const {list} = useAppState();
	const {remove,changeMode,logout} = useAction()
	
	return(
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<Pressable style={styles.navigateButton}
					onPress={() => props.navigation.navigate("Add Item")}>
					<Text style={styles.textStyle}>Add new item</Text>
				</Pressable>
				<Pressable style={[styles.navigateButton,styles.logoutButton]}
					onPress={logout}>
					<Text style={styles.textStyle}>Logout</Text>
				</Pressable>
			</View>
			<View style={styles.listBox}>
				<FlatList data={list}
						renderItem={
							({item}) => {
								return (
									<View style={styles.row}>
										<Text style={styles.textStyle}>Type:{item.type}</Text>
										<Text style={styles.textStyle}>Count:{item.count}</Text>
										<Text style={styles.textStyle}>Price:{item.price}</Text>
										<Pressable style={styles.buttonStyle}
											onPress={() => remove(item._id)}>
											<Text style={styles.textStyle}>Remove</Text>
										</Pressable>
										<Pressable style={styles.buttonStyle}
											onPress={() => { 
												changeMode("Edit",item)
												props.navigation.navigate("Add Item")
											}}
											>
											<Text style={styles.textStyle}>Edit</Text>
										</Pressable>
									</View>
								)
							}
						}
						keyExtractor={(item) => item._id}
				/>
			</View>
		</View>
	)
	
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	buttonBox:{
		flex:1,
		flexDirection:"row",
		justifyContent:"space-evenly",
		alignItems:"center"
	},
	listBox:{
		flex:10,
		justifyContent:"center",
		alignItems:"center"
	},
	navigateButton:{
		flex:1,
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"lightblue"
	},
	logoutButton:{
		backgroundColor:"lightgreen"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontWeight:"bold",
		fontSize:13,
		padding:2
	},
	buttonStyle:{
		padding:3,
		width:70,
		height:50,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"
	}
})

export default ShoppingList;