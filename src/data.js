// esta es una función de ejemplo
// puedes ver como agregamos la función a nuestro objeto global window
const example = () => {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "./data/injuries/injuries.json", true);
  xmlhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlhttp.send();
  xmlhttp.onload = function() {
  let objeto = xmlhttp.responseText;
  ordenar(objeto);
  }
  console.log("HOLS");
  return 'example';
  };
  function ordenar(jsonObj)
  {
  let objJson=JSON.parse(jsonObj);
console.log(objJson);
  }
  window.example = example;