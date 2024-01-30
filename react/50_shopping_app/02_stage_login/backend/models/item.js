const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	type:String,
	count:Number,
	price:Number,
	user:{type:String,index:true}
})

module.exports = mongoose.model("Item",Schema);