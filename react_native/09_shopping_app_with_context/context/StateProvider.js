import {useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import * as actionConstants from '../types/actionConstants';

const initialState = {
	list:[],
	isLogged:false,
	token:"",
	error:"",
	loading:false,
	mode:"Add",
	editable:{
		_id:"",
		type:"",
		count:"",
		price:""
	}
}
