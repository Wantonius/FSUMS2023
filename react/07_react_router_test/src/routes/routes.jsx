import {createBrowserRouter} from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Secret from '../components/Secret';
import HeaderLayout from '../components/HeaderLayout';

const router = createBrowserRouter([{
	element:<HeaderLayout/>,
	children:[
	{
		path:"/",
		element:<Home/>
	},
	{
		path:"/about",
		element:<About/>
	},
	{
		path:"/secret",
		element:<Secret/>
	}
	]
}])

export default router;