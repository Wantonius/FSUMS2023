function findMe() {

	const status = document.querySelector("#status");
	const maplink = document.querySelector("#maplink");
	
	maplink.href = "";
	maplink.textContent = "";
	
	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		
		status.textContent = "";
		
		maplink.href = "https://www.openstreetmap.org/#map=18/"+latitude+"/"+longitude
		maplink.textContent = "Latitude:"+latitude+", Longitude:"+longitude	
	}
	
	function error() {
		status.textContent = "Cannot retrieve your position"
	}
	
	if(!navigator.getlocation) {
		status.textContent = "No geolocation in browser"
		return;
	} else {
		status.textContent = "Locating ..."
	}
	navigator.geolocation.getCurrentPosition(success,error);
}