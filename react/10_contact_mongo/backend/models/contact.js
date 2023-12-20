import mongoose from 'mongoose';

let Schema = mongoose.Schema({
	firstname:String,
	lastname:{type:String,index:true},
	email:String,
	phone:String
})

Schema.virtual("id").get(function() {
	return this._id;
})

const model = mongoose.model("contact",Schema);

export default model;