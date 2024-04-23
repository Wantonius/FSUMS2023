import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native';

const ShoppingList = (props) => {
	
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	buttonBox:{
		flex:1,
		justifyContent:"center",
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