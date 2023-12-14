var mode = 0;

window.onload = function() {
	createForm();
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