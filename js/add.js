"use strict"
document.addEventListener("DOMContentLoaded",load);

let url = 'http://web-unicen.herokuapp.com/api/groups/20pedemonte/servicios/';

function load(){
    cargarTabla();
    document.querySelector(".enviarDatos").addEventListener("click", agregarItems);
    document.querySelector(".enviar3Datos").addEventListener("click", agregar3Items);
    document.querySelector(".filtro").addEventListener("keyup", filtro);
   
}



function cargarTabla(){
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let container = document.querySelector(".tablaCambiable");
            mostrarDatos(container, json);
        })
        .catch(function (e) {
            console.log(e)
        })
}

function mostrarDatos(container, json){
    container.innerHTML= "";
    for(let i=0; i< json.servicios.length; i++){
        let valor = json.servicios[i];;
        let row = container.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6Btn = row.insertCell(5);
        let cell7Btn = row.insertCell(6);
        cell1.innerHTML = valor.thing.servicio; 
        cell2.innerHTML = valor.thing.esmaltadoLiso; 
        cell3.innerHTML = valor.thing.esmaltadoNailArt; 
        cell4.innerHTML = valor.thing.tecnica1S;
        cell5.innerHTML = valor.thing.retiro;
        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.addEventListener("click", function () { editar(valor._id) });
        cell6Btn.appendChild(btnEditar);
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Borrar";
        cell7Btn.appendChild(btnEliminar);
        btnEliminar.addEventListener("click", function () { eliminar(valor._id) });

    }
}


function agregarItems(){
    let servicio= document.querySelector(".servicio").value;
    let esmaltadoLiso= document.querySelector(".esmaltadoLiso").value;
    let esmaltadoNailArt= document.querySelector(".esmaltadoNailArt").value;
    let tecnica1S= document.querySelector(".tecnica1S").value;
    let retiro= document.querySelector(".retiro").value;
    let arrtabla ={
        "servicio" : servicio ,
        "esmaltadoLiso" : esmaltadoLiso,
        "esmaltadoNailArt" : esmaltadoNailArt,
        "tecnica1S": tecnica1S,
        "retiro": retiro,
        }
     
     let data = {
        "thing": arrtabla
    }

    fetch(url, {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                cargarTabla()
            }
        })
        .catch(error => console.log(error))
}


function agregar3Items(){
    for(let i=0; i<3; i++){
        agregarItems();
    }
}


function eliminar(id) {
    fetch(url + id, {
        'method': 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                cargarTabla()
            }
        })
        .catch(error => console.log(error))
}


function editar(id) {
    let servicio= document.querySelector(".servicio").value;
    let esmaltadoLiso= document.querySelector(".esmaltadoLiso").value;
    let esmaltadoNailArt= document.querySelector(".esmaltadoNailArt").value;
    let tecnica1S= document.querySelector(".tecnica1S").value;
    let retiro= document.querySelector(".retiro").value;
    
    let arrtabla ={
        "servicio" : servicio ,
        "esmaltadoLiso" : esmaltadoLiso,
        "esmaltadoNailArt" : esmaltadoNailArt,
        "tecnica1S": tecnica1S,
        "retiro": retiro,
        }
    
    let data = {
        "thing": arrtabla
    }

    fetch(url + id, {
        'method': 'PUT',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                cargarTabla();
            }
        })
}


function filtro() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json.servicios);
            let tabla = document.querySelector(".tablaCambiable");

            for (let i = 0; i < json.servicios.length; i++) {
                let s = json.servicios[i].thing.servicio;
                let j = json.servicios.length - 1;
                if (s.toUpperCase().indexOf(document.querySelector(".filtro").value.toUpperCase()) > -1) {
                    tabla.children[j-i].classList.remove("ocultarFila"); 
                }
                else {
                    tabla.children[j-i].classList.add("ocultarFila"); 
                }
            }
        })
        .catch(function (e) {
            console.log(e)
        })
}

