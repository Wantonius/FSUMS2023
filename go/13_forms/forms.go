package main

import (
	"html/template"
	"net/http"
)

type Item struct {
	Type	string
	Count	string
	Price	string
}

type ShoppingData struct {
	ShoppingList	string
	Items			[]Item
	Success			bool
}

func main() {
	
	data := ShoppingData{"My List",[]Item{},false}
	
	tmpl := template.Must(template.ParseFiles("forms.html"))	

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w,data)
			data.Success = true
			return
		}
		details := Item{
			Type:	r.FormValue("type"),
			Count:	r.FormValue("count"),
			Price:	r.FormValue("price"),
		}
		
		data.Items = append(data.Items,details)
		tmpl.Execute(w,data)
		data.Success = false
	})
	http.ListenAndServe(":3000",nil)
}