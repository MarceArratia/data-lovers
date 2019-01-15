
function pruebap(){
//fetch lee un archivo JSON, texto, imágenes.otros
   fetch('data/injuries/injuries.json')//fetch dice donde está el archivo
    .then(res => res.json())//promesa en res, implementa el JSON
    .then(data => {//promesa si se cumple escribe contenido de JSON
        console.log(data);
    })
} 
