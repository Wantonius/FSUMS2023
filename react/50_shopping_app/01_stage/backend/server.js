const express = require("express");
const mongoose = require("mongoose");
const shoppingRoute = require("./routes/shoppingroute");

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

let port = process.env.PORT || 3000;

app.use("/api",shoppingRoute);

app.listen(port);

console.log("Running in port",port);
