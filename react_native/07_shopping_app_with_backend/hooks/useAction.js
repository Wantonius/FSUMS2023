import {useState,useEffect} from 'react';

const useAction = () => {
	
	const [state,setState] = useState({
		list:[],
		token:"",
		isLogged:false,
		loading:false,
		error:""
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const baseUrl = "https://fair-cyan-tortoise.cyclic.app"
	
	
	//FETCH USEEFFECT
	
	useEffect(() => {},[urlRequest]);
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
				},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
				},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}
	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":state.token
				}
			},
			action:"logout"
		})
	}

	//SHOPPING API
	
	const getList = (token) => {
		let tempToken = state.token;
		if(token) {
			tempToken = token
		}
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{
					"token":tempToken
				}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":state.token
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{
					"token":state.token
				}
			},
			action:"removeitem"
		})
	}

	return {state,register,login,logout,getList,addItem,removeItem}
}

export default useAction;