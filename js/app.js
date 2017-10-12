document.addEventListener("DOMContentLoaded", function() {
let body = document.querySelector("body");
let hamburger = document.getElementById("logo");
let nav =document.querySelector("nav");
let ul = nav.querySelector("ul");
let header = document.querySelector("header");

let mobile = window.matchMedia("screen and (max-width:375px)");
console.log(mobile);
let sizeChange = function (mobile){
 if (mobile.matches) {
  nav.style.width="100%";
  nav.style.height="5vh";
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
if (thisDiv.attr("data-weather")=== 'few clouds' ) {
    thisDiv.find("span .few_clouds").removeClass("hide");
}
if (thisDiv.attr("data-weather")=== "clear sky" ) {
    thisDiv.find("span .sun").removeClass("hide");
}
if (thisDiv.attr("data-weather")=== 'shower rain' || thisDiv.attr("data-weather")=== 'rain') {
    thisDiv.find("span .rain").removeClass("hide");
}
if (thisDiv.attr("data-weather")=== 'scattered clouds' || thisDiv.attr("data-weather")=== 'broken clouds') {
    thisDiv.find("span .clouds").removeClass("hide");
}
if (thisDiv.attr("data-weather")=== 'snow' ) {
    thisDiv.find("span .snow").removeClass("hide");
}
if (thisDiv.attr("data-weather")=== 'mist' || thisDiv.attr("data-weather")=== 'haze' ) {
    thisDiv.find("span .night").removeClass("hide");
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
