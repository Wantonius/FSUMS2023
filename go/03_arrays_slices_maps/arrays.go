package main

import "fmt"

func main() {
	
	//In go arrays are fixed length and they are initialzized to default value unless initialized with something else
	
	var myArray [6]int
	
	fmt.Println("MyArray:",myArray)
	fmt.Println("MyArray length:",len(myArray))
	
	myArray[3] = 50
	fmt.Println("MyArray again",myArray)
	
	myInitializedArray := [3]int{1,2,3}
	
	fmt.Println("Initialized array",myInitializedArray)
	
	//This is a slice. Slices are dynamically create and can change in size. They have more functionality than arrays.
	
	var mySlice []int //Does not allocate memory
	
	myAllocatedSlice := make([]int,10) //A slice with size 10 dynamically allocated ints of zero value
	
	fmt.Println("mySlice",mySlice)
	fmt.Println("mySlice length",len(mySlice))
	
	fmt.Println("myAllocatedSlice",myAllocatedSlice)
	fmt.Println("myAllocatedSlice length",len(myAllocatedSlice))

	mySlice = append(mySlice,10)
	
	//Appending multiple values
	
	mySlice = append(mySlice,[]int{10,100}...)

	fmt.Println("mySlice",mySlice)
	fmt.Println("mySlice length",len(mySlice))

	copiedSlice := make([]int,len(mySlice))

	copy(copiedSlice,mySlice)
	
	fmt.Println("Copied slice:",copiedSlice)
	
	partialSlice := mySlice[1:3]

	fmt.Println("Partial Slice:",partialSlice)

	//Maps can use any key value pair. Use make to create maps
	
	intStrmap := make(map[int]string)
	strIntmap := make(map[string]int)
	
	intStrmap[1] = "One"
	intStrmap[2] = "Two"
	
	strIntmap["one"] = 1
	strIntmap["two"] = 2
	
	fmt.Println("IntStrMap",intStrmap)
	fmt.Println("StrIntMap",strIntmap)
	
	//Remove by key using delete
	
	delete(strIntmap,"two")
	fmt.Println("StrIntMap",strIntmap)
}