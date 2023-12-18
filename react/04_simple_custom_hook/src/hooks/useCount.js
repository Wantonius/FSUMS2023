import {useState} from 'react';

const useCount = (initialState = 0) => {
	
	const [count,setCount] = useState(initialState);
	
	const increment = () => setCount(count => count +1);
	
	const decrement = () => setCount(count => count -1);
	
	return [count,increment,decrement];
}

export default useCount;