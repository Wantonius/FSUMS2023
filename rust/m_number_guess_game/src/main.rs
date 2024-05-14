use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
	
	println!("Guess the number between 1 and 100");
	
	let secret_number =  rand::thread_rng().gen_range(1..101);
	let mut max_number = 100;
	let mut min_number = 1;
	
	loop {
		println!("Please enter your guess");
		
		let mut guess = String::new();
		
		io::stdin().read_line(&mut guess).expect("Failed to read line");
	
		let guess:u32 = match guess.trim().parse() {
			Ok(num) => num,
			Err(msg) => {
				println!("{}",msg);
				continue;
			}
		};
		if guess <= min_number {
			println!("Your guess was too small. Guess atleast {}",min_number);
			continue;
		}
		
		if guess >= max_number {
			println!("Your guess was too large. Guess no more than {}",max_number);
			continue;
		}
		println!("You guessed {}",guess);
		
		match guess.cmp(&secret_number) {
			Ordering::Less => {
				println!("Too small! Lowest you can guess now is {}",guess);
				min_number = guess;
			},
			Ordering::Greater => {
				println!("Too large! Highest you can guess now is {}",guess);
				max_number = guess;
			},
			Ordering::Equal => {
				println!("You win!");
				break;
			}
		}
	}
	
}