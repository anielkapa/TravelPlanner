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


    });
