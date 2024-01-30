import {useEffect} from 'react';
import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';


function App() {

	const action = useAction();
	
	useEffect(() => {
		action.getList();
	},[])

	return (
		<>
			<ShoppingForm add={action.add}/>
			<ShoppingList list={action.state.list} remove={action.remove} edit={action.edit}/>
		</>
	)
}

export default App
