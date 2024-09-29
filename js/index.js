
const inputType = document.getElementById("search");
let data = [];

inputType.addEventListener("input", function () {
    getApi(inputType.value);
});

async function getApi(city) {
    let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f97aff7170ca42948a3111359242409&q=${city}&days=3`);
    data = await url.json();
    console.log(data);
    displayToday();
    displayTomorrow();
    displayNextTomorrow();
}


function displayToday() {
    let catouna = "";
    let day = data.forecast.forecastday[0];
    let Day = getDay(day.date);
    let location = data.location.name;
    let temp = data.current.temp_c;
    let img = data.current.condition.icon;
    // let status = data.current.condition.text;
    let status = day.hour[0].condition.text;;

    console.log(status)
    catouna +=
    `<div class="forecast m-0 ">
        
    <div class="header-forecast d-flex align-items-center justify-content-between">
        <div class="day">${Day.day}</div>
        <div class="date">${`${Day.dayData} ${Day.month}`}</div>
    </div>

    <div class="info-header  px-4">

        <p class="location">${location}</p>

        <div class="temp">
            <p class="degree-num">${temp}<sup>o</sup>C</p>
            <div class="forecast-image">
                <img src="${img}" alt="" width="90">
            </div>

            <p class="status">${status}</p>
            <div class="forecast-icon">

                <span class="pe-2 icons"><img src="./images/icon-umberella.png" alt="" class="pe-2">20%</span>
                <span  class="pe-2 icons"><img src="./images/icon-wind.png" alt="" class="pe-2">18km/h</span>
                <span  class="pe-2 icons"><img src="./images/icon-compass.png" alt="" class="pe-2">East</span>

            </div>
        </div>

    </div>
</div>`

    document.getElementById("todayData").innerHTML = catouna;
}

function displayTomorrow() {
    let catouna = "";
    let day = data.forecast.forecastday[1];
    let Day = getDay(day.date);
    let temp = day.day.avgtemp_c; 
    let img = day.day.condition.icon;
    let status = day.day.condition.text; 

    let mintemp=day.day.mintemp_c
    catouna +=
        `<div class=" forecast  bg-color h-100 m-0">
            <div class="header-forecast Tomorrow m-0">
                <p class="day text-center mb-0">${Day.day}</p>
            </div>
            <div class="info-header  mx-3 text-center py-4 ">
                <div class="temp">
                    <div class="forecast-image text-center">
                        <img src="${img}" alt="" width="48" class="mb-4">
                    </div>
                    <div class="degree-nums  text-center">${temp}<sup>o</sup>C</div>
                    <span class="text-center">${mintemp}<sup>o</sup>C</span>

                    <div class="status">${status}</div>
                </div>
            </div>
        </div>`;

    document.getElementById("tomorrowData").innerHTML = catouna; // Ensure you have a container for tomorrow
}

function displayNextTomorrow() {
    let catouna = "";
    let day = data.forecast.forecastday[2];
    let Day = getDay(day.date);
    let temp = day.day.avgtemp_c; 
    let img = day.day.condition.icon; 
    let status = day.day.condition.text; 
    let mintemp=day.day.mintemp_c

    catouna +=
        `<div class="forecast  m-0 ">
            <div class="header-forecast NextTomorrow m-0">
                <p class="day text-center mb-0">${Day.day}</p>
            </div>
            <div class="info-header mx-3 text-center py-4 ">
                <div class="temp">
                    <div class="forecast-image  text-center">
                        <img src="${img}" alt="" width="48"class="mb-4" >
                    </div>
                    <div class="degree-nums ">${temp}<sup>o</sup>C</div>
                    <span class="text-center">${mintemp}<sup>o</sup>C</span>

                    <div class="status">${status}</div>
                </div>
            </div>
        </div>`;

    document.getElementById("nextTomorrowData").innerHTML = catouna; // Ensure you have a container for the day after tomorrow
}

function getDay(x) {
    let date = new Date(x);
    let day = date.toLocaleString("en-US", { weekday: "long" });
    let month = date.toLocaleString("en-US", { month: "long" });
    let dayData = date.getDate();

    return { day, month, dayData };
}



navigator.geolocation.getCurrentPosition(
    (city)=>{
        console.log(city)
        let latitude=city.coords.latitude
        let longitude=city.coords.longitude
        console.log(latitude,longitude)
        getApi(`${latitude},${longitude}`)
    },
    (error)=>{
        getApi("cairo")
    }
)
