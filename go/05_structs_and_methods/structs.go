package main

import "fmt"

type dog struct {
	name,breed string
}

type cat struct {
	name,breed string
}

//interfaces are implemented by structs by implementing each functions separately as a method

type animal interface {
	move()
	speak()
}

// The (d dog) in the function is called a receiver type and it ties the function to a specific struct making it a method
// You can also implement methods that are not part of an interface. Use pointer receiver then (d *dog)

func (d dog) move() {
	fmt.Printf("%s runs. See %s run\n",d.name,d.name)
}

func (d dog) speak() {
	fmt.Printf("%s barks! %s is a %s\n",d.name,d.name,d.breed)
}

func (c cat) move() {
	fmt.Printf("%s sneaks!\n",c.name)
}

func (c cat) speak() {
	fmt.Printf("%s meows. %s is a %s\n",c.name,c.name,c.breed)
}

func act(a animal) {
	a.move()
	a.speak()
}

func main() {
	
	duke := dog{name:"Duke",breed:"Sitter"}
	whiskers := cat{name:"Whiskers",breed:"Persian"}

	fmt.Println("Accessing directly through methods")
	
	duke.move()
	duke.speak()
	whiskers.move()
	whiskers.speak()
	
	fmt.Println("Accessing through interface function")
	
	act(duke)
	act(whiskers)
}