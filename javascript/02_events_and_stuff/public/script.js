function changeColor() {
	let header = document.getElementById("header");
	const colorpicker = "ABCDEF0123456789";
	let color = "#";
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp];
	}
	header.style.color = color;
	console.log("Changed color!",color);
}