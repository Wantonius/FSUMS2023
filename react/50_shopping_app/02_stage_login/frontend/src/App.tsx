import {useEffect} from 'react';
import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';


function App() {

	const action = useAction();
	
	useEffect(() => {
		action.getList();
	},[])

	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<ShoppingList list={action.state.list} remove={action.remove} edit={action.edit}/>}/>
				<Route path="/form" element={<ShoppingForm add={action.add}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</>
	)
}

export default App
