document.addEventListener("DOMContentLoaded", function() {
let body = document.querySelector("body");
let hamburger = document.getElementById("logo");
let nav =document.querySelector("nav");
let ul = nav.querySelector("ul");
let header = document.querySelector("header");

let mobile = window.matchMedia("(max-width:375px)");
console.log(mobile);
console.log(hamburger);
let sizeChange = function (mobile){
 if (mobile.matches) {
  nav.style.width="100%";
  nav.style.height="10vh";
 }
}

hamburger.addEventListener("click", function (e) {
  if (nav.style.display==="none" || nav.style.visibility==="hidden") {
    nav.style.display="flex";
    nav.style.visibility="visible";
    nav.style.flexDirection="row";
    ul.style.flexDirection="row";
    header.style.width="100vw";
    hamburger.style.visibility="hidden";
    hamburger.style.width="1%";
  }else{
   nav.style.display="none";
   hamburger.style.display="flex";
  }
});

nav.addEventListener("mouseleave", function (e){
 if (nav.style.display==="flex") {
   nav.style.visibility="hidden";
  hamburger.style.visibility="visible";
  hamburger.style.width="30%";
 }
});

mobile.addListener(sizeChange);
sizeChange(mobile);

let divWeather = $('.row div');
let divId= divWeather.data("id");
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?id=";
let apiKey = '&APPID=bf96a337b9028212ebff87de47bce404';
let weatherIcons = divWeather.find("span div");
weatherIcons.addClass("hide");

divWeather.on("mouseenter", function (e){
let dataWeatherId = $(this).data("id");
let thisDiv = $(this);
$.ajax({
  url: weatherUrl + dataWeatherId + apiKey,
  method: "GET"
}).done(function(response) {
  let weatherNow = response['weather'];
  let temperatureNow = response['main'];
  for (var key in weatherNow) {
    let weatherDescprition = weatherNow[key]['description'];
    thisDiv.attr("data-weather", weatherDescprition);
    switch (thisDiv.attr("data-weather")){
      case 'few clouds':
            thisDiv.find("span .few_clouds").removeClass("hide");
            break;
      case "clear sky":
            thisDiv.find("span .sun").removeClass("hide");
            break;
      case 'shower rain':
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'shower rain':
      case 'drizzle':
      case 'drizzle rain':
      case 'light intensity rain':
            thisDiv.find("span .rain").removeClass("hide");
            break;
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
            thisDiv.find("span .clouds").removeClass("hide");
            break;
      case 'snow':
      case 'sleet':
      case 'light snow':
            thisDiv.find("span .snow").removeClass("hide");
            break;
      case 'mist':
      case 'haze':
      case 'fog':
      case 'smoke':
      case 'sand':
      case 'dust':
            thisDiv.find("span .night").removeClass("hide");
            break;
      case 'storm':
            thisDiv.find("span .storm").removeClass("hide");
            break;
      default:
            thisDiv.find("span .text").removeClass("hide");
            let text = thisDiv.attr("data-weather");
            thisDiv.find('span .text').text(text);
    }
  }
  for (var key in temperatureNow) {
    let temperatureLeverl = temperatureNow['temp'];
    temperatureLeverl= Math.round(temperatureLeverl-273);
    thisDiv.attr("data-temp", temperatureLeverl);
    thisDiv.find('p').text(`${temperatureLeverl} °C`);
  }
}).fail(function(error) {
  console.log(error);
});
    });

    });
