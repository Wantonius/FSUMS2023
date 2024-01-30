const express = require("express");
const mongoose = require("mongoose");
const shoppingRoute = require("./routes/shoppingroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sessionModel = require("./models/session");
const userModel = require("./models/user");

let app = express();

app.use(express.json());

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/espooshopping?retryWrites=true&w=majority"

mongoose.connect(url).then(
	() => console.log("Connected to Mongo Atlas"),
	(err) => console.log("Failed to connect to Mongo Atlas. Reason:",err)
)

//MIDDLEWARES

const time_to_live_diff = 3600000

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	sessionModel.findOne({"token":req.headers.token}).then(function(session) {
		if(!session) {
			return res.status(403).json({"Message":"Forbidden"});
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"});
			}).catch(function(err) {
				console.log(err);
				return res.status(403).json({"Message":"Forbidden"});
			})
		} else {
			session.ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function() {
				return next();
			}).catch(function(err) {
				console.log(err);
				return next();
			})
		}
	}).catch(function(err) {
		console.log(err);
		return res.status(403).json({"Message":"Forbidden"});
	})
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"})
		}
		let user = new userModel({
			"username":req.body.username,
			"password":hash
		})
		user.save().then(function() {
			return res.status(200).json({"Message":"Register success"})
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username already in use"})
			}
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"})
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad request"});
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"Message":"Unauthorized"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log(err);
				return res.status(500).json({"Message":"Internal server error"})
			}
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"})
			}
			let token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				"user":req.body.username,
				"ttl":now+time_to_live_diff,
				"token":token
			})
			session.save().then(function() {
				return res.status(200).json({"token":token})
			}).catch(function(err) {
				console.log(err);
				return res.status(500).json({"Message":"Internal server error"})
			})
		})
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({"Message":"Internal server error"})
})
})


let port = process.env.PORT || 3000;

app.use("/api",isUserLogged,shoppingRoute);

app.listen(port);

console.log("Running in port",port);
