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

app.listen(3000);

console.log("Running in port 3000");