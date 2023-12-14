var mode = 0;

window.onload = function() {
	createForm();
	getContactList();
}

createForm = () => {
	let root = document.getElementById("root");
	let form = document.createElement("form");
	form.setAttribute("class","m-3");
	
	//First name input and label
	
	let firstNameInput = document.createElement("input");
	firstNameInput.setAttribute("type","text");
	firstNameInput.setAttribute("value","");
	firstNameInput.setAttribute("name","firstname");
	firstNameInput.setAttribute("id","firstname");
	firstNameInput.setAttribute("class","form-control");
	let firstNameLabel = document.createElement("label");
	firstNameLabel.setAttribute("for","firstname");
	firstNameLabel.setAttribute("class","form-label");
	let firstNameText = document.createTextNode("First Name");
	firstNameLabel.appendChild(firstNameText);
	
	//Last name input and label
	
	let lastNameInput = document.createElement("input");
	lastNameInput.setAttribute("type","text");
	lastNameInput.setAttribute("value","");
	lastNameInput.setAttribute("name","lastname");
	lastNameInput.setAttribute("id","lastname");
	lastNameInput.setAttribute("class","form-control");
	let lastNameLabel = document.createElement("label");
	lastNameLabel.setAttribute("for","lastname");
	lastNameLabel.setAttribute("class","form-label");
	let lastNameText = document.createTextNode("Last Name");
	lastNameLabel.appendChild(lastNameText);
	
	//Email input and label
	
	let emailInput = document.createElement("input");
	emailInput.setAttribute("type","email");
	emailInput.setAttribute("value","");
	emailInput.setAttribute("name","email");
	emailInput.setAttribute("id","email");
	emailInput.setAttribute("class","form-control");
	let emailLabel = document.createElement("label");
	emailLabel.setAttribute("for","email");
	emailLabel.setAttribute("class","form-label");
	let emailText = document.createTextNode("Email");
	emailLabel.appendChild(emailText);
	
	//Last name input and label
	
	let phoneInput = document.createElement("input");
	phoneInput.setAttribute("type","tel");
	phoneInput.setAttribute("value","");
	phoneInput.setAttribute("name","phone");
	phoneInput.setAttribute("id","phone");
	phoneInput.setAttribute("class","form-control");
	let phoneLabel = document.createElement("label");
	phoneLabel.setAttribute("for","phone");
	phoneLabel.setAttribute("class","form-label");
	let phoneText = document.createTextNode("Phone");
	phoneLabel.appendChild(phoneText);

	//Submit Button
	
	let submitButton = document.createElement("input");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("id","submitbutton");
	submitButton.setAttribute("value","Add");
	submitButton.setAttribute("class","btn btn-primary");
	
	//Append to form
	
	form.append(firstNameLabel,firstNameInput,lastNameLabel,lastNameInput,emailLabel,emailInput,phoneLabel,phoneInput,submitButton);
	form.addEventListener("submit",function(e) {
		e.preventDefault();
		//addContact()
	})
	
	//Append to root
	root.appendChild(form);
}

//REST API

addContact = async () => {
	const firstname = document.getElementById("firstname");
	const lastname = document.getElementById("lastname");
	const email = document.getElementById("email");
	const phone = document.getElementById("phone");
	const contact = {
		"firstname":firstname.value,
		"lastname":lastname.value,
		"email":email.value,
		"phone":phone.value
	}
	let url = "/api/contact"
	let request = {
		method:"POST",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(contact)
	}
	if(mode) {
		url = "/api/contact/"+mode;
		request = {
			method:"PUT",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(contact)
		}
	}
	const response = await fetch(url,request);
	if(response.ok) {
		console.log("Add contact success");
		getContactList();
		const submitbutton = document.getElementById("submitbutton");
		submitbutton.value= "Add";
		mode = 0;
		firstname.value="";
		lastname.value="";
		email.value="";
		phone.value="";
	} else {
		console.log("Add contact failed. Server responded with a status "+response.status+" "+response.statusText)
	}
}

getContactList = async () => {
	const request = {
		method:"GET"
	}
	const response = await fetch("/api/contact",request);
	if(response.ok) {
		const list = await response.json();
		//populateTable(list)
	} else {
		console.log("Get contacts failed. Server responded with a status "+response.status+" "+response.statusText)
	}
}

removeContact = async (id) => {
	const request = {
		method:"DELETE"
	}
	const response = await fetch("/api/contact/"+id,request);
	if(response.ok) {
		getContactList();
	} else {
		console.log("Remove contact failed. Server responded with a status "+response.status+" "+response.statusText)
	}
}

editContact = (contact) => {
	const firstname = document.getElementById("firstname");
	const lastname = document.getElementById("lastname");
	const email = document.getElementById("email");
	const phone = document.getElementById("phone");
	firstname.value = contact.firstname;
	lastname.value = contact.lastname;
	email.value = contact.email;
	phone.value = contact.phone;
	const submitbutton = document.getElementById("submitbutton");
	submitbutton.value = "Save";
	mode = contact.id
}