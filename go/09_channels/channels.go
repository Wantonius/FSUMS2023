package main


import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Println("Worker: lets do some work")
	time.Sleep(3*time.Second)
	fmt.Println("Worker: and we are done")
	
	fmt.Println("Worker: Informing main that we are done")
	done <- true
}

func main() {

	messages := make(chan string)
	
	fmt.Println("--Basic Channel--")
	
	go func() {
		fmt.Println("Pinger: pinging the main")
		messages <- "ping"
	}()
	
	fmt.Println("Main:reading the channel")
	
	msg := <-messages
	fmt.Println(msg)
	time.Sleep(2*time.Second)
	
	fmt.Println("--Buffered channel--")
	
	buffered := make(chan string, 2)
	
	buffered <- "buffered"
	buffered <- "channel"
	
	fmt.Println(<-buffered)
	fmt.Println(<-buffered)
	time.Sleep(2*time.Second)
	
	fmt.Println("--Channel synchro--")
	
	done := make(chan bool)
	go worker(done)
	fmt.Println("Main: Waiting for the work to be done")
	<-done
	fmt.Println("Main: Worker done. Exiting")
}