import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	index:number;
	changeMode(index:number,mode:string):void;
}

const Row = (props:Props) => {
	
	return(
		<tr>
			<td>{props.item.type}</td>
			<td>{props.item.count}</td>
			<td>{props.item.price}</td>
			<td><button className="btn btn-danger" onClick={() => props.changeMode(props.index,"remove")}>Remove</button></td>
			<td><button className="btn btn-secondary" onClick={() => props.changeMode(props.index,"edit")}>Edit</button></td>
		</tr>
	)
	
}

export default Row;