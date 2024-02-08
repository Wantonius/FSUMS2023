import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {PayloadAction,ThunkDispatch} from '@reduxjs/toolkit';
import {remove,edit,AppState} from '../store/shoppingSlice';


interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList = () => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const listSelector = (state) => state.list;
	const list = useSelector(listSelector);
	const dispatch:ThunkDispatch<AppState,null,PayloadAction> = useDispatch();
	
	const changeMode = (index:number,mode:string) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id:number) => {
		dispatch(remove(id));
		changeMode(0,"cancel");
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(item));
		changeMode(0,"cancel");
	}
	
	const shoppingItem = list.map((item,index) => {
		if(index === state.removeIndex) {
			return (
				<RemoveRow key={item.id} item={item} removeItem={removeItem} changeMode={changeMode}/>
			)
		}
		if(index === state.editIndex) {
			return (
				<EditRow key={item.id} item={item} editItem={editItem} changeMode={changeMode}/>
			)
		}
		return(
			<Row key={item.id} item={item} index={index} changeMode={changeMode}/>
		)
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th scope="col">Type</th>
					<th scope="col">Count</th>
					<th scope="col">Price</th>
					<th scope="col">Remove</th>
					<th scope="col">Edit</th>
				</tr>
			</thead>
			<tbody>
			{shoppingItem}
			</tbody>
		</table>
	)
}

export default ShoppingList;