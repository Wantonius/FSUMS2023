import StateProvider from './context/StateProvider';
import Container from './components/Container';

export default function App() {
	
	return(
		<StateProvider>
			<Container/>
		</StateProvider>
	)
}

