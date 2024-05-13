//Two types of structs in Rust. Tuple structs and normal c-type structs

#[derive(Debug)] //Built-in trait debug.
struct Color(u8,u8,u8);

struct SizeAndColor {
	size:u32,
	color:Color
}

fn main() {
	let my_color = Color(50,0,50);
	
	let size_and_color = SizeAndColor {
		size:150,
		color:my_color
	};

	println!("Size is {} and color is {:?}",size_and_color.size,size_and_color.color);
}