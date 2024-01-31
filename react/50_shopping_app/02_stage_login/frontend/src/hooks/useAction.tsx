import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';
import {AppState} from '../types/states';

interface UrlRequest {
	request:Request;
	action:string;
}

interface Token {
	token:string;
}

const useAction = () => {
	
	const [state,setState] = useState<AppState>({
		list:[],
		isLogged:false,
		loading:false,
		error:"",
		token:"",
		user:""
	})
	
	const [urlRequest, setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	//HELPER FUNCTIONS
	
	const saveToStorage = (state:AppState) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	useEffect(() => {
		let temp = sessionStorage.getItem("state");
		if(temp) {
			let state:AppState = JSON.parse(temp);
			setState(state);
		}
	},[])
	
	const setLoading = (loading:boolean) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}
	
	const setError = (error:string) => {
		setState((state) =>	{
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setUser = (user:string) => {
		setState((state) => {
			let tempState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	//useEffect FETCH
	
	useEffect(() => {
		
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(urlRequest.request);
			setLoading(false);
			if(!response) {
				setError("Server never responded. Try again later!");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						let temp = await response.json();
						if(!temp) {
							setError("Failed to parse shopping information. Try again later.");
							return;
						}
						let list:ShoppingItem[] = temp as ShoppingItem[];
						setState((state) => {
							let tempState = {
								...state,
								list:list
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
					case "add":
					case "remove":
					case "edit":
						getList(state.token);
						return;
					case "register":
						setError("Register Success");
						return;
					case "login":
						let temp2 = await response.json();
						if(!temp2) {
							setError("Failed to parse login information. Try again later");
							return;
						}
						let data = temp2 as Token;
						setState((state) => {
							let tempState = {
								...state,
								isLogged:true,
								token:data.token
							}
							saveToStorage(tempState);
							return tempState;
						})
						getList(data.token);
						return;
					case "logout":
						let tempState = {
							list:[],
							isLogged:false,
							loading:false,
							error:"",
							token:"",
							user:""
						}
						saveToStorage(tempState);
						setState(tempState);
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					let tempState = {
						list:[],
						isLogged:false,
						loading:false,
						token:"",
						error:"Your session has expired. Logging you out.",
						user:""
					}
					saveToStorage(tempState);
					setState(tempState);
					return;
				}
				let errorMessage = "Action failed. Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "register":
						if(response.status === 409) {
							errorMessage = "Username is already in use"
						}
						setError(errorMessage);
						return;
					case "login":
					case "getlist":
					case "add":
					case "remove":
					case "edit":
						setError(errorMessage);
						return;
					case "logout":
						let tempState = {
							list:[],
							isLogged:false,
							loading:false,
							token:"",
							error:"Server responded with an error. Logging you out.",
							user:""
						}
						saveToStorage(tempState);
						setState(tempState);
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest]);
	
	//SHOPPING API FUNCTIONS
	
	const getList = (token:string) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"GET",
				headers:{
					"token":token
				}
			}),
			action:"getlist"
		})
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":state.token
				},
				body:JSON.stringify(item)
			}),
			action:"add"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+id,{
				method:"DELETE",
				headers:{
					"token":state.token
				}
			}),
			action:"remove"
		})
	}
	
	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+item._id,{
				method:"PUT",
				headers:{
					"Content-Type":"application/json",
					"token":state.token
				},
				body:JSON.stringify(item)
			}),
			action:"edit"
		})
	}
	
	//LOGIN API
	
	const register = (user:User) => {
		setUrlRequest({
			request:new Request("/register",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"register"
		})
	}

	const login = (user:User) => {
		setUser(user.username);
		setUrlRequest({
			request:new Request("/login",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"login"
		})
	}
	
	const logout = () => {
		setUrlRequest({
			request:new Request("/logout",{
				method:"POST",
				headers:{
					"token":state.token
				}
			}),
			action:"logout"
		})
	}
	
	return {state,getList,add,remove,edit,setError,login,register,logout}
}

export default useAction;