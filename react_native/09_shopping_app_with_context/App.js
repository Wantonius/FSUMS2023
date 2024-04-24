import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAction from './hooks/useAction';
import LoginPage from './components/LoginPage';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const {state,register,login,logout,addItem,removeItem} = useAction();
	
	let title = "Shopping App";
	if(state.loading) {
		title = "Loading ..."
	}
	if(state.error) {
		title = state.error
	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				title:title,
				headerStyle:{
					backgroundColor:"#00CCCC"
				}
			}}>
			{state.isLogged ? (
				<>
					<Stack.Screen name="ShoppingList">
					{props => <ShoppingList {...props} list={state.list} removeItem={removeItem} logout={logout}/>}
					</Stack.Screen>
					<Stack.Screen name="ShoppingForm">
					{props => <ShoppingForm {...props} addToList={addItem}/>}
					</Stack.Screen>
				</>
			):(
				<>
					<Stack.Screen name="Login">
					{props => <LoginPage {...props} register={register} login={login}/>}
					</Stack.Screen>
				</>
			)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

