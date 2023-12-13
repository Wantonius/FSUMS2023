window.onload = function() {
	let form = document.getElementById("form");
	form.addEventListener("submit",submit);
}

function submit(event) {
	event.preventDefault();
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let user = {
		"username":username,
		"password":password
	}
	login(user);
}

async function login(user) {
	let request = {
		method:"POST",
		headers:{
			"Content-type":"application/json"
		},
		body:JSON.stringify(user)
	}
	let response = await fetch("/login",request);
	if(!response) {
		console.log("No response")
		return;
	}
	if(response.ok) {
		console.log("Logged in");
	} else {
		console.log("Unauthorized!");
	}
}