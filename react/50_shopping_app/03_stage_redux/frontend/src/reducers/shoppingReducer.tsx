import * as actionConstants from '../types/actionConstants';
import {ShoppingState,ShoppingAction} from '../types/states';
import {Reducer} from 'redux';
import ShoppingItem from '../models/ShoppingItem';

const getInitialState = ():ShoppingState => {
	let state = sessionStorage.getItem("shoppingstate");
	if(state) {
		return JSON.parse(state)
	} else {
		return {
			list:[],
			error:""
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state:ShoppingState) => {
	sessionStorage.setItem("shoppingstate",JSON.stringify(state));
}

const shoppingReducer:Reducer<ShoppingState,ShoppingAction> = (state = initialState,action) => {
	console.log("ShoppingReducer, action",action);
	let tempState:ShoppingState = {
		...state
	}
	let error = "";
	let list:ShoppingItem[] = [];
	switch(action.type) {
		case actionConstants.LOADING:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.FETCH_LIST_SUCCESS:
			if(action.payload) {
				list = action.payload as ShoppingItem[]
			}
			tempState = {
				...state,
				list:list
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.ADD_ITEM_SUCCESS:
		case actionConstants.REMOVE_ITEM_SUCCESS:
		case actionConstants.EDIT_ITEM_SUCCESS:
			return state;
		case actionConstants.FETCH_LIST_FAILED:
		case actionConstants.ADD_ITEM_FAILED:
		case actionConstants.REMOVE_ITEM_FAILED:
		case actionConstants.EDIT_ITEM_FAILED:
			if(action.payload) {
				error = action.payload as string;
			}
			tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
		case actionConstants.LOGOUT_FAILED:
			tempState = {
				list:[],
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}	

export default shoppingReducer;