import {useDispatch,useSelector} from 'react-redux';
import {State} from './reducers/countReducer';

function App() {

	const dispatch = useDispatch();
	
	const countSelector = (state:State) => state.count;
	const count = useSelector(countSelector);
	
	return (
		<>
			<h1>Current count:{count}</h1>
			<button onClick={() => dispatch({type:"INCREMENT"})}>+</button>
			<button onClick={() => dispatch({type:"DECREMENT"})}>-</button>
		</>
	)
}

export default App
