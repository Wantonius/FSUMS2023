import React,{useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import {AppState} from '../types/states';
import Action from '../types/Action';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	children:React.ReactNode;
}

const getInitialState = ():AppState => {
	let state = sessionStorage.getItem("state");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			list:[],
			isLogged:false,
			loading:false,
			error:"",
			token:"",
			user:""
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state:AppState) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const listReducer = (state:AppState,action:Action) => {
	let payload:string = "";
	let tempState:AppState = {
		...state
	}
	switch(action.type) {
		case actionConstants.LOADING:
			return {
				...state,
				loading:true,
				error:""
			}
		case actionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case actionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"Register success"
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_SUCCESS:
			if(action.payload) {
				payload = action.payload as string;
			}
			tempState = {
				...state,
				isLogged:true,
				token:payload
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
			tempState = {
				list:[],
				isLogged:false,
				loading:false,
				error:"",
				token:"",
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			if(action.payload) {
				payload = action.payload as string;
			}
			tempState = {
				list:[],
				isLogged:false,
				loading:false,
				error:payload,
				token:"",
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.FETCH_LIST_SUCCESS:
			let list:ShoppingItem[] = [];
			if(action.payload) {
				list = action.payload as ShoppingItem[];
			}
			tempState = {
				...state,
				list:list
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.SET_USER:
			if(action.payload) {
				payload = action.payload as string;
			}
			tempState = {
				...state,
				user:payload
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.ADD_ITEM_SUCCESS:
		case actionConstants.REMOVE_ITEM_SUCCESS:
		case actionConstants.EDIT_ITEM_SUCCESS:
			return state;
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED:
		case actionConstants.FETCH_LIST_FAILED:
		case actionConstants.ADD_ITEM_FAILED:
		case actionConstants.REMOVE_ITEM_FAILED:
		case actionConstants.EDIT_ITEM_FAILED:
			if(action.payload) {
				payload = action.payload as string;
			}			
			tempState = {
				...state,
				error:payload
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

const StateManager = (props:Props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);

	return (
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateManager;