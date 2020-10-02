console.log("JS is loaded")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = search.value;
	message1.textContent = ""
	message2.textContent = "Loading..."
	fetch("http://localhost:3000/weather?address=" + location)
		.then(response => {
			response.json().then(res => {
				if(res.error) {
					message2.textContent = res.error
				} else {
					console.log(res)
					message1.textContent = res.location
					message2.textContent = res.forecastData.temp
				}
			})
		})
	 
})