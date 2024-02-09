import React from 'react';
import {AppState} from '../types/states';

const AppStateContext = React.createContext<AppState>({
	list:[],
	isLogged:false,
	loading:false,
	error:"",
	token:"",
	user:""
})

AppStateContext.displayName = "AppStateContext";

export default AppStateContext;