// const main = document.querySelector('.main');
const weather = document.querySelector('.weather');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click',()=>{
    const APIKey='913ace5ebf211df654083de4b8980a05';
    const city=document.querySelector('.search-box input').value;
    if(city=='')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        console.log(json);
        if(json.cod =='404') {
            weather.style.height='400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        weather.style.height='500px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image=document.querySelector('.weather-box img');
        const temperature=document.querySelector('.weather-box .temperature');
        const description=document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const wind=document.querySelector('.weather-box .wind .text .info-wind span');
        switch (json.weather[0].main) {
            case 'Clear':
                image.src='images/sun.png'
                break;
            case 'Rain':
                image.src='images/rain.png'
                break;
            case 'Snow':
                image.src='images/snow.png'
                break;
            case 'Mist':
                image.src='images/mist.png'
                break;
            case 'haze':
                image.src='images/mist.png'
                break;
                
        
            default:
                image.src='images/cloud.png';
                
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        console.log(json.wind);
        // wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
        if (wind) {
            wind.innerHTML = `${parseInt(json.wind.speed)}m/s`;
        }
    });
    

}); 