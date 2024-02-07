import * as actionConstants from '../types/actionConstants';
import {LoginState,ShoppingAction} from '../types/states';
import {Reducer} from 'redux';

const getInitialState = ():LoginState => {
	let state = sessionStorage.getItem("loginstate");
	if(state) {
		return JSON.parse(state)
	} else {
		return {
			isLogged:false,
			loading:false,
			token:"",
			error:"",
			user:""
		}
	}
	
}

const initialState = getInitialState();

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const loginReducer:Reducer<LoginState,ShoppingAction> = (state = initialState,action) => {
	console.log("loginReducer, action",action);
	let tempState = {
		...state
	}
	let error = "";
	let token = "";
	let user = "";
	switch(action.type) {
		case actionConstants.LOADING:
			return {
				...state,
				error:"",
				loading:true
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
				token = action.payload as string;
			}
			tempState = {
				...state,
				isLogged:true,
				token:token
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED:
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
			tempState = {
				isLogged:false,
				loading:false,
				token:"",
				error:"",
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			if(action.payload) {
				error = action.payload as string;
			}
			tempState = {
				isLogged:false,
				loading:false,
				token:"",
				error:error,
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.SET_USER:
			if(action.payload) {
				user = action.payload as string;
			}
			tempState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default loginReducer;