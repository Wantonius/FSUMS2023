import {useEffect} from 'react';
import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';


function App() {

	const action = useAction();
	
	let messageArea = <h4 style={{height:40, margin:"auto",textAlign:"center"}}></h4>
	if(action.state.loading) {
		messageArea = <h4 style={{height:40, margin:"auto",textAlign:"center"}}>Loading ...</h4>
	}
	if(action.state.error) {
		messageArea = <h4 style={{height:40, margin:"auto",textAlign:"center"}}>{action.state.error}</h4>
	}
	if(action.state.isLogged) {
		return (
			<>
				<Navbar isLogged={action.state.isLogged} logout={action.logout} user={action.state.user}/>
					{messageArea}
				<Routes>
					<Route path="/" element={<ShoppingList list={action.state.list} remove={action.remove} edit={action.edit}/>}/>
					<Route path="/form" element={<ShoppingForm add={action.add}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	} else {
		return(
			<>
				<Navbar isLogged={action.state.isLogged} logout={action.logout} user={action.state.user}/>
					{messageArea}
				<Routes>
					<Route path="/" element={<LoginPage register={action.register} login={action.login} setError={action.setError}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}
}

export default App
