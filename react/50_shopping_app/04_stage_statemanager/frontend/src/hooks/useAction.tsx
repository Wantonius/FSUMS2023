import {useState,useEffect,useContext} from 'react';
import useAppState from './useAppState';
import ActionContext from '../context/ActionContext';
import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';
import {AppState} from '../types/states';
import * as actionConstants from '../types/actionConstants';

interface UrlRequest {
	request:Request;
	action:string;
}

interface Token {
	token:string;
}

const useAction = () => {
	

	const [urlRequest, setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	const {dispatch} = useContext(ActionContext);
	
	const {token} = useAppState();
	
	//HELPER FUNCTIONS

	
	const setError = (error:string) => {
		dispatch({
			type:actionConstants.REGISTER_FAILED,
			payload:error
		})
	}
	

	//useEffect FETCH
	
	useEffect(() => {
		
		const fetchData = async () => {
			dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(urlRequest.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					payload:"Server never responded. Resetting."
				})
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
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							payload:list
						})
						return;
					case "add":
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList(token);
						return;
					case "remove":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList(token);
						return;
					case "edit":
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList(token);
						return;
					case "register":
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						let temp2 = await response.json();
						if(!temp2) {
							setError("Failed to parse login information. Try again later");
							return;
						}
						let data = temp2 as Token;
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							payload:data.token
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT_FAILED,
						payload:"Your session has expired. Logging you out."
					})
					return;
				}
				let errorMessage = "Action failed. Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "register":
						if(response.status === 409) {
							errorMessage = "Username is already in use"
						}
						dispatch({
							type:actionConstants.REGISTER_FAILED,
							payload:errorMessage
						})
						return;	
					case "login":
						dispatch({
							type:actionConstants.LOGIN_FAILED,
							payload:errorMessage
						})
						return;
					case "getlist":
						dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							payload:errorMessage
						})
						return;
					case "add":
						dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							payload:errorMessage
						})
						return;
					case "remove":
						dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							payload:errorMessage
						})
						return;
					case "edit":
						dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							payload:errorMessage
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_FAILED,
							payload:"Server responded with an error. Logging you out."
						})
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest]);
	
	//SHOPPING API FUNCTIONS
	
	const getList = (token:string,search?:string) => {
		let url = "/api/shopping";
		if(search) {
			url = url +"?type="+search
		}
		setUrlRequest({
			request:new Request(url,{
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
					"token":token
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
					"token":token
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
					"token":token
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
		dispatch({
			type:actionConstants.SET_USER,
			user:user.username
		})
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
					"token":token
				}
			}),
			action:"logout"
		})
	}
	
	return {getList,add,remove,edit,setError,login,register,logout}
}

export default useAction;