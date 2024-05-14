struct Person {
	name:String,
	real_name:String,
	height:u8,
	happiness:bool
}

fn main() {
	let papa_doc = Person {
		name:"Papa Doc".to_string(),
		real_name:"Clarence".to_string(),
		height:170,
		happiness:false
	};
	
	let Person {
		name:a,
		real_name:b,
		height:c,
		happiness:d
	} = papa_doc;
	
	println!("They call him {} but his real name is {}. He is {} cm tall but is he happy? {}",a,b,c,d);
}