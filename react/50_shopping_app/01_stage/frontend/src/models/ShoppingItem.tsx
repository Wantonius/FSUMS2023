export default class ShoppingItem {
/*
	type:string = "";
	count:number = 0;
	price:number = 0;
	_id:string = "";
	
	constructor(type:string,count:number,price:number,_id:string) {
		this.type = type;
		this.count = count;
		this.price = price;
		this._id = _id;
	}
*/
	constructor(public type:string,public count:number,public price:number, public _id:string) {}
}