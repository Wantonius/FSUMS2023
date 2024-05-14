use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
	
	let (tx,rx) = mpsc::channel();
	
	let tx1 = tx.clone();
	
	thread::spawn(move || {
		let vals = vec![
			String::from("Hi"),
			String::from("from"),
			String::from("the"),
			String::from("thread"),
		];
		
		for val in vals {
			tx1.send(val).unwrap();
			thread::sleep(Duration::from_secs(1));
		}
	});
	
	thread::spawn(move || {
		let vals = vec![
			String::from("More"),
			String::from("from"),
			String::from("another"),
			String::from("thread"),
		];
		
		for val in vals {
			tx.send(val).unwrap();
			thread::sleep(Duration::from_secs(1));
		}
	});
	
	for received in rx {
		println!("Got: {}",received);
	};
}