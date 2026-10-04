document.addEventListener("DOMContentLoaded", () => {
	// Entries
	const timescaleSelect = document.getElementById("timescales");
	const hourSelect = document.getElementById("hours");
	const zipSelect = document.getElementById("zip-code");

	// Keys for local storage
	const timescaleKey = "timescale";
	const hourKey = "hour";
	const zipKey = "zip";

	// Set current values from localStorage on load
	if (localStorage.getItem(timescaleKey)) {
		timescaleSelect.value = localStorage.getItem(timescaleKey);
	}
	if (localStorage.getItem(hourKey)) {
		hourSelect.value = localStorage.getItem(hourKey);
	}
	if (localStorage.getItem(zipKey)) {
		zipSelect.value = localStorage.getItem(zipKey);
	}

	// Save preference and update on change
	timescaleSelect.addEventListener("change", (e) => {
		if (e.target.value) {
			localStorage.setItem(timescaleKey, e.target.value);
			console.log("Timescale set to", e.target.value);
		} else {
			localStorage.removeItem(timescaleKey);
			console.log("Timescale removed");
		}
	});
	hourSelect.addEventListener("change", (e) => {
		if (e.target.value) {
			localStorage.setItem(hourKey, e.target.value);
			console.log("Hour set to", e.target.value);
		} else {
			localStorage.removeItem(hourKey);
			console.log("Hour removed");
		}
	});
	zipSelect.addEventListener("change", (e) => {
		if (e.target.value) {
			localStorage.setItem(zipKey, e.target.value);
			console.log("ZIP set to", e.target.value);
		} else {
			localStorage.removeItem(zipKey);
			console.log("ZIP removed");
		}
	});
});
