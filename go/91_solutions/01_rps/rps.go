package main


import (
    "fmt"
    "time"
	"math/rand"
)

func opponent_worker(messages chan string, done chan bool) {

	var r int
	var end bool
	rand.Seed(time.Now().UnixNano())
	for !end {
		end  = <-done
		r = rand.Intn(2)
		switch r {
			case 0:
				messages <- "rock"
			case 1:
				messages <- "paper"
			case 2:
				messages <- "scissors"
		}
	}
}

func main() {

	messages := make(chan string)
	done := make(chan bool)
	var opp_play string	
	var choice,player,opponent int
	var end bool
	
	go opponent_worker(messages,done)
	
	for !end {
		done <- end
		fmt.Println("Please choose your play")
		fmt.Println("1. Rock")
		fmt.Println("2. Paper")
		fmt.Println("3. Scissors")
		fmt.Scanf("%d\n",&choice)		
		opp_play = <-messages
		fmt.Printf("Opponent plays %s\n",opp_play)
		switch choice {
			case 1:
				if opp_play == "paper" {
					opponent++
				}
				if opp_play == "scissors" {
					player++
				}
			case 2:
				if opp_play == "rock" {
					player++
				}
				if opp_play == "scissors" {
					opponent++
				}
			case 3:
				if opp_play == "rock" {
					opponent++
				}
				if opp_play == "paper" {
					player++
				}				
		}
		fmt.Printf("Current score: %d player vs %d opponent\n",player,opponent)
		if(player == 3) {
			fmt.Println("Congrats you win!")
			end = true
			done <- end
		}
		if(opponent == 3) {
			fmt.Println("You lose!")
			end = true
			done <- end
		}
	}
}