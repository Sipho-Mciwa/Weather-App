const API_KEY = "f67eb91abc5e44659ad61626252410";
const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=2&q=Johannesburg`;
const outputElement = document.getElementById('output');
const forecastTable = document.getElementById('forecastBlocks');
const currentTemp = document.getElementById('temperature');
const displayCity = document.getElementById('city')
let testData = []

function createBlock(data) {
    let timeOfDay = JSON.stringify(data['time']);
    let temperature = JSON.stringify(data['temp_c']);

    const block = document.createElement('td');
    block.id = 'forecastBlock'
    const timePara = document.createElement('p');
    timePara.id = 'timeP'
    const tempPara = document.createElement('p');
    tempPara.id = 'temp-P'

    const icon = document.createElement('img');

    icon.src = data['condition']['icon'];
    timePara.textContent = timeOfDay.slice(11, timeOfDay.length -1);
    tempPara.textContent = temperature + '°';


    block.appendChild(timePara);
    block.appendChild(icon);
    block.appendChild(tempPara);

    forecastTable.appendChild(block);
}

function updateWeatherDetails(data) {

    let cloudData = JSON.stringify(data['cloud']);
    let dewPointData = JSON.stringify(data['dewpoint_c']);
    let humidityData = JSON.stringify(data['humidity']);
    let pressureData = JSON.stringify(data['pressure_mb']);
    let windData = JSON.stringify(data['wind_kph']);
    let uvData = JSON.stringify(data['uv']);
    let feelsLikeData = JSON.stringify(data['feelslike_c']);
    let visiblityData = JSON.stringify(data['vis_km']);

    const cloud = document.getElementById('cloud');
    const dewPoint = document.getElementById('dew-point');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');
    const uvIndex = document.getElementById('uv-index');
    const feels = document.getElementById('feels-like');
    const visiblity = document.getElementById('visiblity');

    cloud.textContent = cloudData + ' oktas';
    dewPoint.textContent = dewPointData + '°';
    humidity.textContent = humidityData + '%';
    pressure.textContent = pressureData + ' mb';
    wind.textContent = windData + ' km/h';
    uvIndex.textContent = uvData + ' of 10';
    feels.textContent = feelsLikeData + "°";
    visiblity.textContent = visiblityData + " km";

}

fetch(apiURL)
    .then(response => {
    // Check if the response was successful (e.g., status code 200)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Parse the response body as JSON
    return response.json();
    })
    .then(data => {
    // Handle the parsed data
    displayCity.textContent = data['location']['name'];
    currentTemp.textContent = data['current']['temp_c'].toString() + '°';
    // outputElement.textContent = JSON.stringify(data, null, 2);
    console.log(data)
    const forecast = data['forecast']['forecastday'];
    forecast.forEach(element => {
        if (element['hour']) {
            const time = element['hour'];
            time.forEach(hour => {
                createBlock(hour)
            })
        }
    });

    updateWeatherDetails(data['current'])
    })
    .catch(error => {
    // Handle any errors that occurred during the fetch operation
    console.error('Error fetching data:', error);
}); 