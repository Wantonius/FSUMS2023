import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import useAppState from '../hooks/useAppState';
import useAction from '../hooks/useAction';
import {useEffect} from 'react';

const Stack = createNativeStackNavigator();

const Container = (props) => {
	
	const {isLogged,error,loading} = useAppState();
	const {getList} = useAction();
	
	useEffect(() =>{
		if(isLogged) {
			getList()
		}
	},[isLogged])
	
	let title = "Shopping App";
	if(loading) {
		title = "Loading ..."
	}
	if(error) {
		title = error
	}
	return(
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				title:title,
				headerStyle:{
					backgroundColor:"#00CCCC"
				}
			}}>
			{isLogged ? (
				<>
					<Stack.Screen name="ShoppingList" component={ShoppingList}/>
					<Stack.Screen name="Add Item" component={ShoppingForm}/>
				</>
			):(
				<>
					<Stack.Screen name="Login" component={LoginPage}/>
				</>
			)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Container;