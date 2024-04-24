import {useState,useEffect,useContext} from 'react';
import ActionContext from '../context/ActionContext';
import useAppState from './useAppState';
import * as actionConstants from '../types/actionConstants';

const useAction = () => {
	
	const {dispatch} = useContext(ActionContext);
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	const baseUrl = "https://fair-cyan-tortoise.cyclic.app"
	
	
	//FETCH USEEFFECT
	
	useEffect(() => {
		

		const fetchData = async () => {
			if(urlRequest.action === "changemode") {
				dispatch({
					type:actionConstants.CHANGE_MODE,
					mode:urlRequest.request.mode,
					editable:urlRequest.request.editable
				})
				return;
			}
			dispatch({
				type:actionConstants.LOADING
			})
			let url = baseUrl+urlRequest.url;
			const response = await fetch(url,urlRequest.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT
				})
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "register":
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Failed to parse login information"
							})
							return;
						}
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT
						})
						return;
					case "additem":
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return
					case "removeitem":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;
					case "edititem":
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						changeMode("Add",{
							_id:"",
							type:"",
							count:"",
							price:""
						})
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information"
							})
							return;
						}
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT
					})
					return;
				}
				let errorMessage = "Server responded with a status "+response.status+" "+response.statusText
				switch(urlRequest.action) {
					case "register":
						if(response.status === 409) {
							errorMessage = "Username is already in use"
						} 
						dispatch({
							type:actionConstants.REGISTER_FAILED,
							error:errorMessage
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT
						})
						return
					case "login":
						dispatch({
							type:actionConstants.LOGIN_FAILED,
							error:errorMessage
						})
						return
					case "additem":
						dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							error:errorMessage
						})
						return
					case "removeitem":
						dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							error:errorMessage
						})
						return
					case "edititem":
						dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							error:errorMessage
						})
						return
					case "getlist":
						dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							error:errorMessage
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
					"token":token
				}
			},
			action:"logout"
		})
	}

	//SHOPPING API
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{
					"token":token
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
					"token":token
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const remove = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{
					"token":token
				}
			},
			action:"removeitem"
		})
	}
	
	const edit = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item._id,
			request:{
				method:"PUT",
				headers:{
					"Content-Type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			},
			action:"edititem"			
		})
	}
	
	const changeMode = (mode,editable) => {
		setUrlRequest({
			url:"",
			request:{
				mode:mode,
				editable:editable
			},
			action:"changemode"
		})
	}

	return {register,login,logout,getList,addItem,remove,edit,changeMode}
}

export default useAction;