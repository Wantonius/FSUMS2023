import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {useState} from 'react';

interface Props {
	list:ShoppingItem[];
	remove(id:string):void;
	edit(item:ShoppingItem):void;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList = (props:Props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
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
	
	const removeItem = (id:string) => {
		props.remove(id);
		changeMode(0,"cancel");
	}
	
	const editItem = (item:ShoppingItem) => {
		props.edit(item);
		changeMode(0,"cancel");
	}
	
	const shoppingItem = props.list.map((item,index) => {
		if(index === state.removeIndex) {
			return (
				<RemoveRow key={item._id} item={item} removeItem={removeItem} changeMode={changeMode}/>
			)
		}
		if(index === state.editIndex) {
			return (
				<EditRow key={item._id} item={item} editItem={editItem} changeMode={changeMode}/>
			)
		}
		return(
			<Row key={item._id} item={item} index={index} changeMode={changeMode}/>
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