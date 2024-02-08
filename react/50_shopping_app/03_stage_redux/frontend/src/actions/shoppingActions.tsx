import {loading,stopLoading,logoutFailed} from './loginActions';
import ShoppingItem from '../models/ShoppingItem';
import {AppState,ShoppingAction} from '../types/states';
import {ThunkDispatch} from 'redux-thunk';
import * as actionConstants from '../types/actionConstants';

//ASYNC THUNKS

export const getList = (token:string,search?:string) => {
	return (dispatch:ThunkDispatch<AppState,null,ShoppingAction>) => {
		let url = "/api/shopping";
		if(search) {
			url = url + "?type="+search
		}
		let request = new Request(url,{
			method:"GET",
			headers:{
				"token":token
			}
		})
		handleFetch(request,"getlist",dispatch,token);
	}
}

export const add = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<AppState,null,ShoppingAction>) => {
		let request = new Request("/api/shopping",{
			method:"POST",
			headers:{
				"Content-Type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		})
		handleFetch(request,"add",dispatch,token);
	}
}

export const remove = (token:string,id:string) => {
	return (dispatch:ThunkDispatch<AppState,null,ShoppingAction>) => {
		let request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:{
				"token":token
			}
		})
		handleFetch(request,"remove",dispatch,token);
	}

}

export const edit = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<AppState,null,ShoppingAction>) => {
		let request = new Request("/api/shopping/"+item._id,{
			method:"PUT",
			headers:{
				"Content-Type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		})
		handleFetch(request,"edit",dispatch,token)
	}
}


const handleFetch = async (request:Request,act:string,dispatch:ThunkDispatch<AppState,null,ShoppingAction>,token:string) => {
	dispatch(loading());
	const response = await fetch(request);
	dispatch(stopLoading());
	if(!response) {
		dispatch(logoutFailed("Server never responded. Logging you out."));
		return;
	}
	if(response.ok) {
		switch(act) {
			case "getlist":
				let temp = await response.json();
				if(!response) {
					dispatch(fetchListFailed("Failed to parse shopping information. Try again later."));
					return;
				}
				let list = temp as ShoppingItem[];
				dispatch(fetchListSuccess(list));
				return;
			case "add":
				dispatch(fetchItemSuccess(actionConstants.ADD_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			case "remove":
				dispatch(fetchItemSuccess(actionConstants.REMOVE_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			case "edit":
				dispatch(fetchItemSuccess(actionConstants.EDIT_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			default:
				return;
		}
	} else {
		if(response.status === 403) {
			dispatch(logoutFailed("Your session has expired. Logging you out."))
			return;
		}
		let errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
		switch(act) {
			case "getlist":
				dispatch(fetchListFailed("Failed to fetch shopping information."+errorMessage));
				return;
			case "add":
				dispatch(fetchItemFailed(actionConstants.ADD_ITEM_FAILED,"Failed to add new item."+errorMessage));
				return;
			case "remove":
				dispatch(fetchItemFailed(actionConstants.REMOVE_ITEM_FAILED,"Failed to remove item."+errorMessage));
				return;
			case "edit":
				dispatch(fetchItemFailed(actionConstants.EDIT_ITEM_FAILED,"Failed to edit item."+errorMessage));
				return;
			default:
				return;
		}
	}
}


//ACTION CREATORS

const fetchListSuccess = (list:ShoppingItem[]) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		payload:list
	}
}

const fetchListFailed = (error:string) => {
	return {
		type:actionConstants.FETCH_LIST_FAILED,
		payload:error
	}
}

const fetchItemSuccess = (type:string) => {
	return {
		type:type
	}
}

const fetchItemFailed = (type:string,error:string) => {
	return {
		type:type,
		payload:error
	}
}