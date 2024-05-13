fn main() {

	let x = 5;
	println!("Value of x is {x}");	
	//x = 6;
	//println!("Value of x is {x}");	

	//Remove comment to see immutability in Rust. Variables must be specifically called mutable.
	
	let mut x = 5;
	println!("Value of x is {x}");	
	x = 6;
	println!("Value of x is {x}");	

	//Shadowing variable within an inner scope
	
	let z = 5;
	
	let z = z + 1;
	{
		let z = z * 2;
		println!("Value of z in inner scope {z}");
	}
	println!("Value of z in outer scope {z}");
}