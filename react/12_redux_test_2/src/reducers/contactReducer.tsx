import {UnknownAction,Reducer} from 'redux';
import Contact from '../models/Contact';

export interface AppState {
	list:Contact[];
	id:number;
}

export interface MyAction {
	type:string;
	payload:Contact | number;
}

const initialState:AppState = {
	list:[],
	id:100
}

const contactReducer:Reducer<AppState,MyAction> = (state = initialState,action) => {
	console.log("contactReducer,action",action);
	console.log("contactReducer,state",state);
	switch(action.type) {
		case "ADD_CONTACT":
			let tempContact = action.payload as Contact;
			tempContact.id = state.id
			return {
				id:state.id+1,
				list:state.list.concat(tempContact)
			}
		case "REMOVE_CONTACT":
			let tempId = action.payload as number;
			let tempList = state.list.filter(contact => contact.id !== tempId);
			return {
				...state,
				list:tempList
			}
		default:
			return state;
	}
}

export default contactReducer;