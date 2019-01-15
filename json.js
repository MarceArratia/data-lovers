/*function prueba(){
    let requestURL = '';
    let request = new XMLHttpRequest();
    request.open(GET,requestURL);
    request.responseType = 'json';
    request.send();
    
    request.onload = function(){
    let jsonInjuries = request.response;
    console.log(jsonInjuries);
    }
    
}*/
//const objJson;
//funcion para leer archivo JSON
function prueba(){
    //crea una variable del tipo XMLHttp
    let xmlhttp = new XMLHttpRequest();
    //cofigura variable anterior
    xmlhttp.open("GET", "./data/injuries/injuries.json", true);//metodo get y dirección del archivo
    xmlhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");//archivo de texto con UTF-8
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");//da cabecera para que chrome no bloquee conexión por politica de seguridad
    xmlhttp.send();//envia todo lo configurado
    xmlhttp.onload = function() { //onload lee send y lo ejecuta
    let objeto = xmlhttp.responseText; //variable de tipo responseText que contiene configuración y origen del dato
    FillJson(objeto);//invoca función para leer JSON
    }
} 
//lee función, para leer el objeto y convertirlo en JSON
function FillJson(jsonObj)
{
     let objJson=JSON.parse(jsonObj);//convierte el objeto en JSON
     localStorage.setItem('storeObj', JSON.stringify(objJson));//localStorage variable que queda de forma local(navegador)(nombre,objeto)
    //console.log(objJson);
}