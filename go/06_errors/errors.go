package main

import (
	"errors"
	"fmt"
)

func notDog(animal string) (string,error) {
	if(animal == "dog") {
		return "",errors.New("Not working with a dog!")
	}
	return animal+" is not a dog, will work fine",nil
}

func main() {

	animals := []string{"cat","dog"}
	
	for _, a := range animals {
		result, err := notDog(a)
		if(err != nil) {
			fmt.Println(err)
		} else {
			fmt.Println(result)
		}
	}
}