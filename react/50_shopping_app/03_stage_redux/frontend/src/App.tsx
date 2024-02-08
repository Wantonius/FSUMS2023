import {useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function App() {

	
	const selector = (state) => {
		let error = state.shopping.error;
		if(state.login.error) {
			error = state.login.error
		}
		return {
			isLogged:state.login.isLogged,
			loading:state.login.loading,
			error:error
		}
	}
	const state = useSelector(selector);
	
	let messageArea = <h4 style={{height:40, margin:"auto",textAlign:"center"}}></h4>
	if(state.loading) {
		messageArea = <h4 style={{height:40, margin:"auto",textAlign:"center"}}>Loading ...</h4>
	}
	if(state.error) {
		messageArea = <h4 style={{height:40, margin:"auto",textAlign:"center"}}>{state.error}</h4>
	}
	if(state.isLogged) {
		return (
			<>
				<Navbar/>
					{messageArea}
				<Routes>
					<Route path="/" element={<ShoppingList />}/>
					<Route path="/form" element={<ShoppingForm />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	} else {
		return(
			<>
				<Navbar/>
					{messageArea}
				<Routes>
					<Route path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}
}

export default App
