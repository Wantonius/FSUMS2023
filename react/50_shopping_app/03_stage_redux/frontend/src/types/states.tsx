import ShoppingItem from '../models/ShoppingItem';

export interface LoginState {
	isLogged:boolean;
	loading:boolean;
	token:string;
	error:string;
	user:string;
}

export interface ShoppingState {
	list:ShoppingItem[];
	error:string;
}

export interface AppState {
	login:LoginState;
	shopping:ShoppingState;
}

export interface ShoppingAction {
	type:string;
	payload?: ShoppingItem[] | string;
}