function pruebap(){
    //fetch lee un archivo JSON, texto, imágenes.otros
       fetch('data/injuries/injuries.json')//fetch dice donde está el archivo
        .then(res => res.json())//promesa en res, implementa el JSON
        .then(data => {//promesa si se cumple escribe contenido de JSON
            console.log(data);
        })
    } 
        //lee función, para leer el objeto y convertirlo en JSON
    function FillJson(jsonObj)
    {
         let objJson=JSON.parse(jsonObj);//convierte el objeto en JSON
         localStorage.setItem('storeObj', JSON.stringify(objJson));//localStorage variable que queda de forma local(navegador)(nombre,objeto)
        //console.log(objJson);
    } 