"use stirct"


function validar() {
  let nombre, celular, servicio, captcha;
  nombre =document.getElementById("nombre").value;
  celular =document.getElementById("celular").value;
  servicio =document.getElementById("servicio").value;
  captcha= document.getElementById("captcha").value;

  if(nombre==""){
    alert("Completar Nombre");
    return false;
  }
  else if(celular==""){
    alert("Completar Celular");
    return false;
  }
  else if(servicio==""){
    alert("Completar Servicio");
    return false;
  }
  else if (captcha != "4"){
    alert ("Valor de captcha incorrecto");
    return false;
  }
  else{
    alert("Gracias por completar el formulario");
    document.querySelector(".formulario").innerHTML = "Has sido registrado";
  }

}


