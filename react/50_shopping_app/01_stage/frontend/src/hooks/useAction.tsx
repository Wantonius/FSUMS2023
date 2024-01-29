import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {AppState} from '../types/states';

interface UrlRequest {
	request:Request;
	action:string;
}

const useAction = () => {
	
	const [state,setState] = useState<AppState>({
		list:[]
	})
	
	const [urlRequest, setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	//useEffect FETCH
	
	useEffect(() => {},[urlRequest]);
	
	//SHOPPING API FUNCTIONS
	
	const getList = () => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"GET"
			}),
			action:"getlist"
		})
	}
	
	
}

export default useAction;