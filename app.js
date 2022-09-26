const form = document.querySelector(".top-banner form")
const input = document.querySelector(".top-banner input")
const msg = document.querySelector(".top-banner .msg")
const list = document.querySelector(".ajax-section .cities")

const API_KEY = "853e2452214d1620cbe2212c670a3271" // Do not use this key on your project!!!!!!!

form.addEventListener("submit", e => {
    e.preventDefault()
    const inputVal = input.value

    // Check if there's already a city on the list
    const listItems = list.querySelectorAll(".ajax-section .city")
    const listItemsArray = Array.from(listItems)

    if (listItemsArray.length > 0 ){
        const filteredArray = listItemsArray.filter(ele => {
            let content = ""
            if (inputVal.includes(",")){
                if (inputVal.split(",")[1].length > 2){
                    inputVal = inputVal.split(",")[0]
                    content = ele
                        .querySelector(".city-name span")
                        .textContent.toLowerCase()
                } else {
                    content = ele.querySelector(".city-name").dataset.name.toLowerCase()
                }
            } else {
                content = ele.querySelector(".city-name span").textContent.toLowerCase()
            }
            return content == inputVal.toLowerCase()
        })

        if (filteredArray.length > 0) {
            msg.textContent = `The weather for ${filteredArray[0].querySelector(".city-name span").textContent} is already being displayed
            ... or be more specific with country `
            form.reset()
            input.focus()
            reutrn
        }
    }

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


