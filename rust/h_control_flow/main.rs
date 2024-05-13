fn main() {
	let my_number = 5;
	if my_number == 5 {
		println!("It's five"); 
	} else if my_number == 6 {
		println!("It's six!");
	} else {
		println!("It's some other number");
	}

	//Instead of switch we have match
	
	let my_number = 5;
	match my_number {
		0 => println!("It's zero"),
		1 => println!("It's one"),
		2 => println!("It's two"),
		_ => println!("It's some other number"),
	};
	
	let my_number = 5;
	let second_number = match my_number {
		0 => 0,
		5 => 10,
		_ => 2,
	};
	
	println!("{}",second_number);

	let first = (200,0,0);
	let second = (50,50,50);
	let third = (200,50,0);

	match_colors(first);
	match_colors(second);
	match_colors(third);
}

fn match_colors(rgb:(i32,i32,i32)) {
	match rgb {
		(r,_,_) if r < 10 => println!("Not much red"),
		(_,g,_) if g < 10 => println!("Not much green"),
		(_,_,b) if b < 10 => println!("Not much blue"),
		_ => println!("There are all the colors"),
	}
}