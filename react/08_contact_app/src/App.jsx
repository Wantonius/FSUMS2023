import {useState,useEffect} from 'react'


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
	
	useEffect(() => {},[urlRequest])

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

		</>
	)
}

export default App
