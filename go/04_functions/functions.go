package main

import "fmt"

func add(a int, b int) int {
	return a+b
}

func subtract(a int, b int) int {
	return a-b
}

//Multiple return values are possible

func math_action(a int, b int, action string)(int,string) {
	if action == "add" {
		return a+b,"added"
	}
	if action == "subtract" {
		return a-b,"subtracted"
	}
	return 0,"unknown action"
}

//Variadic functions

func sum(vals ...int) int {
	total := 0
	for _,num := range vals {
		total += num
	}
	return total
}

//function return values

func sequence() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {

	c := add(20,10)
	d := subtract(20,10)
	fmt.Println("20+10 = ",c)
	fmt.Println("20-10 = ",d)
	
	e,act := math_action(20,10,"add")
	f,act2 := math_action(20,10,"subtract")
	
	fmt.Printf("20 %s to 10 leads to %d\n",act,e)
	fmt.Printf("10 %s from 20 leads to %d\n",act2,f)

	t := []int{1,2,3,4,5,6,7,8,9,10}
	fmt.Println("Adding together these numbers:",t)
	fmt.Printf("leads to %d\n",sum(t...))

	nextInt := sequence()
	fmt.Println("Ints in sequence")
	fmt.Println(nextInt())
	fmt.Println(nextInt())
	fmt.Println(nextInt())

	moreInts := sequence()
	fmt.Println("Begin again")
	fmt.Println(moreInts())
	fmt.Println(moreInts())
	fmt.Println(moreInts())
}