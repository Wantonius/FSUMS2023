package main

import (
	"fmt"
	"time"
)

func hello() {
	fmt.Println("Hello world goroutine")
}

func numbers() {
	for i := 1; i <= 5;i++ {
		time.Sleep(250*time.Millisecond)
		fmt.Printf("%d\n",i)
	}
	fmt.Println("Numbers routine terminates")
}

func letters() {
	for i := 'a'; i <= 'e'; i++ {
		time.Sleep(400*time.Millisecond)
		fmt.Printf("%c\n",i)
	}
	fmt.Println("Letters routine terminates")
}

func main() {

	go hello()
	time.Sleep(1*time.Second)
	fmt.Println("In main function")
	
	go numbers()
	go letters()
	time.Sleep(3000* time.Millisecond)
	fmt.Println("...main ends")
}