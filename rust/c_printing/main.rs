fn main() {
	println!("The smallest i8 is {} and the biggest i8 is {}",i8::MIN,i8::MAX);
	println!("The smallest u8 is {} and the biggest u8 is {}",u8::MIN,u8::MAX);
	println!("The smallest i128 in {} and the biggest i128 is {}",i128::MIN,i128::MAX);
	println!("The smallest u128 in {} and the biggest u128 is {}",u128::MIN,u128::MAX);
	
	let debug_print = ();
	println!("This will not print with normal braces:{:?}",debug_print);
	
	let father_name = "Vlad";
	let son_name = "Adrian";
	let family_name = "Tepes";
	
	println!("This is {1} {2}, son of {0} {2}.",father_name,son_name,family_name);
	
	println!("{city1} is in {country} and {city2} is in {country}, but {city3} is not in {country}",city1="Helsinki",city2="Turku",city3="Tukholma",country="Suomi")
}