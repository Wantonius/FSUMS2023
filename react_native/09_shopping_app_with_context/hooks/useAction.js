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
	
	useEffect(() => {
		
		if(!urlRequest.url) {
			return;
		}
		
		const fetchData = async () => {
			setState((state) => {
				return {
					...state,
					loading:true,
					error:""
				}
			})
			let url = baseUrl+urlRequest.url;
			const response = await fetch(url,urlRequest.request);
			setState((state) => {
				return {
					...state,
					loading:false
				}
			})
			if(!response) {
				setState({
					list:[],
					isLogged:false,
					loading:false,
					token:"",
					error:"Server never responded. Logging you out."
				})
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "register":
						setState((state) => {
							return {
								...state,
								error:"Register success"
							}
						})
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							setState((state) => {
								return {
									...state,
									error:"Could not parse login information"
								}
							})
							return;
						}
						setState((state) => {
							return {
								...state,
								isLogged:true,
								token:data.token
							}
						})
						getList(data.token);
						return;
					case "logout":
						setState({
							list:[],
							isLogged:false,
							loading:false,
							error:"",
							token:""
						})
						return;
					case "additem":
					case "removeitem":
						getList();
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							setState((state) => {
								return {
									...state,
									error:"Failed to parse shopping information"
								}
							})
							return;
						}
						setState((state) => {
							return {
								...state,
								list:list
							}
						})
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					setState({
						list:[],
						isLogged:false,
						loading:false,
						token:"",
						error:"Session expired. Logging you out."
					})
					return;
				}
				let errorMessage = "Server responded with a status "+response.status+" "+response.statusText
				switch(urlRequest.action) {
					case "register":
						if(response.status === 409) {
							setState((state) => {
								return {
									...state,
									error:"Username already in use"
								}
							})
						} else {
							setState((state) => {
								return {
									...state,
									error:errorMessage
								}
							})
						}
						return;
					case "logout":
						setState({
							list:[],
							isLogged:false,
							loading:false,
							token:"",
							error:""
						})
						return;
					case "login":
					case "additem":
					case "removeitem":
					case "getlist":
						setState((state) => {
							return {
								...state,
								error:errorMessage
							}
						})
						return;
					default:
						return;
				}
				
			}
		}
		
		fetchData();
		
	},[urlRequest]);
	
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