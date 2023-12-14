function start() {

	console.log("------ Simple Currying Function ------");
	console.log(sum(4)(2));
	console.log(sum(4));
	
	console.log("-------Timer async/sync currying -------");
	console.log("Sync function",timer(syncFunc)(200));
	console.log("Async function");
	console.log(timer(asyncFunc)(400).then(response => console.log(response)));
}

const sum = x => y => x+y;

const timer = (timerFunc) => (...args) => {
	const start = Date.now();
	const value = timerFunc(...args);
	if(value && typeof value.then === "function") {
		return value.then(value => ({timespan:Date.now() - start,value}))
	} else {
		return {timespan:Date.now() - start,value}
	}
}

const syncFunc = x => x*2

const asyncFunc = x => new Promise(resolve => {
	setTimeout(() => {
		console.log("Timer done")
		return resolve(x*2)
	},5000)
})