import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		setState((state) => {
			item.id = state.id;
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	const removeItem = (id) => {
		setState((state) => {
			let tempList = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="ShoppingList">
				{props => <ShoppingList {...props} list={state.list} removeItem={removeItem}/>}
				</Stack.Screen>
				<Stack.Screen name="ShoppingForm">
				{props => <ShoppingForm {...props} addToList={addToList}/>}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}


