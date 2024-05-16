package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"strconv"
	"math/rand"
	"time"
)

type Item struct {
	Id		string 	`json:"_id"`
	Type	string	`json:"type"`
	Count	string	`json:"count"`
	Price	string	`json:"price"`
}

type User struct {
	Username	string	`json:"username"`
	Password	string	`json:"password"`
}

type Session struct {
	TTL 	int64
	Token	string
}

type MyToken struct {
	Token	string		`json:"token"`
}

type BackendMessage struct {
	Message	string		`json:"message"`
}

const time_to_live = 3600
var ShoppingItems []Item
var RegisteredUsers []User
var LoggedSessions []Session
var id int64
type Middleware func(http.HandlerFunc) http.HandlerFunc
var letters = []rune("abcdefghjklmnopqrstuABCDEFGHJKLMNOPQRSTU")

func HandleGetAndPost(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
		case http.MethodGet:
			json.NewEncoder(w).Encode(ShoppingItems)
		case http.MethodPost:
			var item Item	
			json.NewDecoder(r.Body).Decode(&item)
			item.Id = strconv.FormatInt(int64(id),10)
			id++
			ShoppingItems = append(ShoppingItems,item)
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
}

func HandleDeleteAndPut(w http.ResponseWriter, r *http.Request) {
	temp_string := r.URL.String()
	tempId := temp_string[len(temp_string)-3:]
	switch r.Method {
		case http.MethodDelete:
			for i,item := range ShoppingItems {
				if item.Id == tempId {
					ShoppingItems = append(ShoppingItems[:i],ShoppingItems[i+1:]...)
				}
			}
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
		case http.MethodPut:
			var t_item Item
			json.NewDecoder(r.Body).Decode(&t_item)
			for i,item := range ShoppingItems {
				if item.Id == tempId {
					t_item.Id = tempId
					ShoppingItems[i] = t_item
				}
			}
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
}

func CreateToken() string {
	rand.Seed(time.Now().UnixNano())
	b := make([]rune,64)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func Register(w http.ResponseWriter, r* http.Request) {
	switch r.Method {
		case http.MethodPost:
			var user User
			json.NewDecoder(r.Body).Decode(&user)
			for _,temp_user := range RegisteredUsers {
				if user.Username == temp_user.Username {
					w.WriteHeader(http.StatusConflict)
					message := BackendMessage{Message:"Username already in use"}
					json.NewEncoder(w).Encode(message)
					return
				}
			}
			RegisteredUsers = append(RegisteredUsers,user)
			message := BackendMessage{Message:"Register Success"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
		case http.MethodPost:
			var user User
			json.NewDecoder(r.Body).Decode(&user)
			for _,u := range RegisteredUsers {
				if u.Username == user.Username {
					if u.Password == user.Password {
						now := time.Now().Unix() + time_to_live
						t := CreateToken()
						LoggedSessions = append(LoggedSessions,Session{TTL:now,Token:t})
						data := MyToken{Token:t}
						json.NewEncoder(w).Encode(data)
						return;
					}
				}
			}
			w.WriteHeader(http.StatusUnauthorized)
			message := BackendMessage{Message:"Unauthorized"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			message := BackendMessage{Message:"Unknown Command"}
			json.NewEncoder(w).Encode(message)
	}
}

func Chain(f http.HandlerFunc, middlewares ... Middleware) http.HandlerFunc {
	for _,m := range middlewares {
		f = m(f)
	}
	return f
}

func isUserLogged() Middleware {
	return func(f http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r* http.Request) {
			token := r.Header.Get("token")
			if token == "" {
				w.WriteHeader(http.StatusForbidden)
				message := BackendMessage{Message:"Forbidden"}
				json.NewEncoder(w).Encode(message)
				return
			}
			for i,session := range LoggedSessions {
				if token == session.Token {
					now := time.Now().Unix()
					if now > session.TTL {
						LoggedSessions = append(LoggedSessions[:i],LoggedSessions[i+1:]...)
						w.WriteHeader(http.StatusForbidden)
						message := BackendMessage{Message:"Forbidden"}
						json.NewEncoder(w).Encode(message)
						return
					} else {
						session.TTL = now + time_to_live
						f(w,r)
						return
					}
				}
			}
			w.WriteHeader(http.StatusForbidden)
			message := BackendMessage{Message:"Forbidden"}
			json.NewEncoder(w).Encode(message)
			return
		}
	}
}

func main() {

	ShoppingItems = make([]Item,0)
	RegisteredUsers = make([]User,0)
	LoggedSessions = make([]Session,0)
	id = 100

	fs := http.FileServer(http.Dir("public/"))
	http.Handle("/",fs)

	http.HandleFunc("/api/shopping",Chain(HandleGetAndPost,isUserLogged()))
	http.HandleFunc("/api/shopping/",Chain(HandleDeleteAndPut,isUserLogged()))
	http.HandleFunc("/register",Register)
	http.HandleFunc("/login",Login)

	fmt.Println("Server running in port 3000")
	http.ListenAndServe(":3000",nil)
}