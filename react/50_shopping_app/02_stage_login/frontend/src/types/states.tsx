import ShoppingItem from '../models/ShoppingItem';

export interface AppState {
	list:ShoppingItem[];
	isLogged:boolean;
	loading:boolean;
	error:string;
	token:string;
	user:string;
}