import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import React,{useState} from 'react';

interface Props {
	list:ShoppingItem[];
	remove(id:string):void;
	edit(item:ShoppingItem):void;
	getList(token:string,search?:string):void;
	token:string;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

interface SearchState {
	search:string;
}

const ShoppingList = (props:Props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const [searchState,setSearchState] = useState<SearchState>({
		search:""
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
	
	const searchByType = () => {
		props.getList(props.token,searchState.search);	
		setSearchState({
			search:""
		})
	}
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setSearchState({
			search:event.target.value
		})
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
	<div style={{"margin":"auto","textAlign":"center"}}>
		<div style={{"width":"30%","textAlign":"center","margin":"auto"}}>
			<label htmlFor="search" className="form-label">Search by type</label>
			<input type="text"
					name="search"
					id="search"
					className="form-control"
					onChange={onChange}
					value={searchState.search}/>
			<button onClick={searchByType} className="btn btn-secondary">Search</button>		
		</div>
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
	</div>
	)
}

export default ShoppingList;