const express = require("express");

let app = express();

app.use(express.json());
app.use("/",express.static("public"));

let database = [];
let id = 100;

/* contact Object
	firstname:string,
	lastname:string,
	email:string,
	phone:string,
	id:number
*/

//REST API

/*
CREATE 	- POST "/api/contact"
READ 	- GET "/api/contact"
UPDATE 	- PUT "/api/contact/:id"
DELETE 	- DELETE "/api/contact/:id"
*/

app.get("/api/contact",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/contact",function(req,res) {
	let contact = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone,
		id:id
	}
	id++;
	database.push(contact);
	return res.status(201).json(contact);
})

app.delete("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let tempDatabase = database.filter(contact => contact.id !== tempId);
	database = tempDatabase;
	return res.status(200).json({"Message":"Success"});
})

app.put("/api/contact/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let contact = {
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,contact);
			return res.status(200).json({"Message":"Success"})
		}
	}
	return res.status(404).json({"Message":"Not Found"});
})

app.listen(3000);

console.log("Running in port 3000");