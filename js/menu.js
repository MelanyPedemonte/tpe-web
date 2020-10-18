"use strict"

let menu= document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu(){
    document.querySelector(".navegador").classList.toggle("show");
}