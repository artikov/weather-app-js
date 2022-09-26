const form = document.querySelector(".top-banner form")
const input = document.querySelector(".top-banner input")
const msg = document.querySelector(".top-banner .msg")
const list = document.querySelector(".ajax-section .cities")





form.addEventListener("submit", e => {
    e.preventDefault()
    const inputVal = input.value


    // SETTING UP OPENWEATHERMAP API
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}`

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // CREATE ASSOCIATED LI ITEMS WITH WEATHER DATA
            const {main, name, sys, weather} = data
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const li = document.createElement("li")
            li.classList.add("city")
            const markup = `
                <h2 class="city-name" data-name="${name}, ${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)/10}<sup>°C</sup></div>
                <figure>
                    <img class="city-icon" src=${icon} alt=${weather[0]["main"]}
                    <figcaption>${weather[0]["description"].toUpperCase()}</figcaption>
                </figure>
            `
            li.innerHTML = markup
            list.appendChild(li)

        })
        .catch( () => {
            msg.textContent = "Please search for a valid city"
        })


    msg.textContent = ""
    form.reset()
    input.focus()
})


