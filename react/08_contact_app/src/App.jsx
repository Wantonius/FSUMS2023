import {useState,useEffect} from 'react'
import ContactForm from './components/ContactForm';


function App() {

	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})

	//USEEFFECT
	
	useEffect(() => {
		getList();
	},[]);
	
	useEffect(() => {
		
		if(urlRequest.url == "") {
			return;
		}
		
		const fetchData = async () => {
			
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(!response) {
				console.log("Server gave no response.");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const list = await response.json();
						if(!list) {
							console.log("Failed to parse contact information");
							return;
						}
						setState({
							list:list
						})
						return;
					case "add":
					case "remove":
					case "edit":
						getList();
						return;
					default:
						return;
				}
			} else {
				console.log("Server responded with a status "+response.status+" "+response.statusText);
			}
		}
		
		fetchData();
		
	},[urlRequest])

	//HELPER FUNCTIONS
	
	const getList = () => {
		setUrlRequest({
			url:"/api/contact",
			request:{
				"method":"GET"
			},
			action:"getlist"
		})
	}

	const addContact = (contact) => {
		setUrlRequest({
			url:"/api/contact",
			request:{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(contact)
			},
			action:"add"
		})
	}
	
	const removeContact = (id) => {
		setUrlRequest({
			url:"/api/contact/"+id,
			request:{
				"method":"DELETE"
			},
			action:"remove"
		})
	}
	
	const editContact = (contact) => {
		setUrlRequest({
			url:"/api/contact/"+contact.id,
			request:{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(contact)
			},
			action:"edit"
		}) 
	}

	return (
		<>
			<ContactForm addContact={addContact}/>
		</>
	)
}

export default App
