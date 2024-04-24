const express = require("express");
const bodyParser = require("body-parser");

let app = express();

//DATABASE
let messageDatabase = []

//USER DATABASES

let registeredUsers = [];
let usersToMessage = [];
let loggedSessions = [];
let id = 100;


enableCors = (req,res,next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-type, token,messagetoken');
	
	return next();
}

app.use(enableCors);

app.options("*",function(req,res) {
	return res.status(204).send();
})

//MIDDLEWARE

createMessageToken = () => {
	let token = "";
	const letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<16;i++) {
		let temp = Math.floor(Math.random()*30)
		token = token + letters[temp];
	}
	return token;	
}

createToken = () => {
	let token = "";
	const letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<256;i++) {
		let temp = Math.floor(Math.random()*30)
		token = token + letters[temp];
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(token) {
		for(let i=0;i<loggedSessions.length;i++) {
			if(loggedSessions[i].token === token) {
				req.session = {};
				req.session.user = loggedSessions[i].user;
				req.session.messagetoken = loggedSessions[i].messagetoken;
				return next();
			}
		}
	}
	return res.status(403).json({message:"forbidden"});
}

app.use(bodyParser.json());
app.use("/api",isUserLogged);

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(409).json({message:"conflict"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({message:"conflict"})
	}
	if(req.body.username.length === 0 || req.body.password.length === 0) {
		return res.status(409).json({message:"conflict"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"username already in use"})
		}
	}
	let messagetoken = createMessageToken();
	registeredUsers.push({
		username:req.body.username,
		password:req.body.password,
		messagetoken:messagetoken
	})
	usersToMessage.push({
		username:req.body.username,
		messagetoken:messagetoken
	})
	return res.status(200).json({message:"success"})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(409).json({message:"conflict"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({message:"conflict"})
	}
	if(req.body.username.length === 0 || req.body.password.length === 0) {
		return res.status(409).json({message:"conflict"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			if(req.body.password === registeredUsers[i].password) {
				let token = createToken();
				loggedSessions.push({
					user:req.body.username,
					token:token,
					messagetoken:registeredUsers[i].messagetoken
				})
				return res.status(200).json({token:token,messagetoken:registeredUsers[i].messagetoken})
			}
		}
	}

	return res.status(403).json({message:"forbidden"})
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(token) {
		for(let i=0;i<loggedSessions.length;i++) {
			if(token === loggedSessions[i].token) {
				loggedSessions.splice(i,1);
				return res.status(200).json({message:"success"})
			}
		}
	}
	return res.status(404).json({message:"not found"})
})
// REST API

app.get("/api/users",function(req,res) {
	return res.status(200).json(usersToMessage);
})

app.get("/api/messages", function(req,res) {
	let tempDatabase = messageDatabase.filter(item => item.messagetoken === req.session.messagetoken)
	res.status(200).json(tempDatabase);
});

app.post("/api/messages", function(req,res) {
	let item = {
		from:req.session.user,
		messagetoken:req.body.messagetoken,
		message:req.body.message,
		id:id
	}
	id++;
	messageDatabase.push(item);
	res.status(200).json({"message":"success"});
});

let port = process.env.PORT || 3000

app.listen(port);

console.log("Running in port ", port);




