use std::thread;
use std::time::Duration;

fn main() {
	
	let handle = thread::spawn(|| {
		for i in 1..10 {
			println!("Hi! Number {} from spawned thread!",i);
			thread::sleep(Duration::from_millis(500));
		};
	});
	
	for i in 1..5 {
		println!("Hi! Number {} from main thread!",i);
		thread::sleep(Duration::from_millis(500));
	}

	handle.join().unwrap();
}