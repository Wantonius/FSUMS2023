import express from 'express';
import mongoose from 'mongoose';
import contactModel from './models/contact.js';

let app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/contacts?retryWrites=true&w=majority"

mongoose.connect(url).then(
	() => console.log("Connected to Mongo Atlas"),
	(err) => console.log("Failed to connect to Mongo Atlas. Reason:",err)
)

mongoose.set("toJSON",{virtuals:true});
//DATABASE
let database = [];
let id = 100;

//REST API

app.get("/api/contact",function(req,res) {
	contactModel.find().then(function(contacts) {
		return res.status(200).json(contacts);
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"});
	})
})


app.post("/api/contact",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"})
	}
	if(!req.body.firstname) {
		return res.status(400).json({"Message":"Bad request"})
	}
	let contact = new contactModel({
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone
	})
	contact.save().then(function(contact) {
		return res.status(201).json(contact);
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

app.delete("/api/contact/:id",function(req,res) {
	contactModel.deleteOne({"_id":req.params.id}).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

app.put("/api/contact/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"})
	}
	if(!req.body.firstname) {
		return res.status(400).json({"Message":"Bad request"})
	}
	let contact = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone
	}
	contactModel.replaceOne({"_id":req.params.id},contact).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
	})
})

app.listen(3000);
console.log("Running in port 3000");