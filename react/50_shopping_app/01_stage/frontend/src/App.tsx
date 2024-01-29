import {useEffect} from 'react';
import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';


function App() {

	const action = useAction();
	
	useEffect(() => {
		action.getList();
	},[])

	return (
		<>
			<ShoppingForm add={action.add}/>
		</>
	)
}

export default App
