import {loading,stopLoading,logoutFailed} from './loginActions';
import ShoppingItem from '../models/ShoppingItem';
import {AppState,ShoppingAction} from '../types/states';
import {ThunkDispatch} from 'redux-thunk';
import * as actionConstants from '../types/actionConstants';

//ASYNC THUNKS


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