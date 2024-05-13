fn print_country(country_name:String) {
	println!("{}",country_name);
}

fn print_country_returns_country(country_name:String) -> String {
	println!("{}",country_name);
	country_name
}

fn print_country_using_reference(country_name:&String) {
	println!("{}",country_name);
}

fn add_sweden(country_name:&mut String) {
	country_name.push_str("-Sweden");
	println!("{}",country_name);
}

fn main() {
	
	let country = String::from("Finland");
	print_country(country);
	//print_country(country);

	//Rust ownership rules state that one owner only. Ownership of String country is moved to print_country function when String is passed on to the function
	
	let country = String::from("Finland");
	let country = print_country_returns_country(country);
	print_country_returns_country(country);
	
	//Borrowing or passing a reference to the function. Ownership does not change.
	let country = String::from("Finland");
	print_country_using_reference(&country);
	print_country_using_reference(&country);

	let mut country = String::from("Finland");
	add_sweden(&mut country);
}