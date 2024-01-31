import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';
import {AppState} from '../types/states';

interface UrlRequest {
	request:Request;
	action:string;
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
			const response = await fetch(urlRequest.request);
			if(!response) {
				console.log("Server sent no response!");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						let temp = await response.json();
						let list:ShoppingItem[] = temp as ShoppingItem[];
						setState({
							list:list
						})
						return;
					case "add":
					case "remove":
					case "edit":
						getList();
						return;
					default:
						return;
				}
			} else {
				console.log("Server responded with a status "+response.status+" "+response.statusText);
			}
		}
		
		fetchData();
		
	},[urlRequest]);
	
	//SHOPPING API FUNCTIONS
	
	const getList = () => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"GET"
			}),
			action:"getlist"
		})
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(item)
			}),
			action:"add"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+id,{
				method:"DELETE"
			}),
			action:"remove"
		})
	}
	
	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+item._id,{
				method:"PUT",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(item)
			}),
			action:"edit"
		})
	}
	
	return {state,getList,add,remove,edit}
}

export default useAction;