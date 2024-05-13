fn main() {

	//There are two types of strings in Rust. First is string reference &str and second is String type.
	//String reference is light weight and fast and String has more functionality.
	
	let name = "Bingo";
	let other_name = String::from("Adrian Tepes");
	println!("My name is {0} and this is {1}",name,other_name);
	
	//&str is dynamically sized and is a reference. String is an owned type and it has a size;
	
	println!("A String is always {:?} bytes. It is Sized.",std::mem::size_of::<String>());
	println!("A &str can be anything. 'Bingo' is {:?} bytes. It is not Sized.",std::mem::size_of_val("Bingo"));
	
	let my_name = "Jim Bob";
	let my_country = "USA";
	let my_home = "Alabama";

	let together = format!(
		"I am {} and I come from {}. I live in {}",my_name,my_country,my_home
	);
	
	println!("{}",together);
}