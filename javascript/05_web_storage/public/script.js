window.onload = function() {
	if(sessionStorage.getItem("message")) {
		let message = sessionStorage.getItem("message")
		const session = document.querySelector("#session");
		session.textContent = "In session storage:"+message;
	}
	if(localStorage.getItem("message")) {
		let message = localStorage.getItem("message")
		const local = document.querySelector("#local");
		local.textContent = "In local storage:"+message;
	}
}

function storeToLocalStorage() {
	localStorage.setItem("message",document.querySelector("#message").value);
}

function storeToSessionStorage() {
	sessionStorage.setItem("message",document.querySelector("#message").value);
}