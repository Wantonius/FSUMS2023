//Let's create enum with two options

enum ThingsInTheSky {
	Sun,
	Stars,
}

fn create_skystate(time:i32) -> ThingsInTheSky {
	match time {
		6..=18 => ThingsInTheSky::Sun,
		_ => ThingsInTheSky::Stars
	}
}

fn check_skystate(state:&ThingsInTheSky) {
	match state {
		ThingsInTheSky::Sun => println!("I see the Sun!"),
		ThingsInTheSky::Stars => println!("I see the stars!"),
	};
}

fn main() {
	let time = 8;
	let skystate = create_skystate(time);
	check_skystate(&skystate);
	
	let time2 = 22;
	let skystate2 = create_skystate(time2);
	check_skystate(&skystate2);
}