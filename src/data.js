// esta es una función de ejemplo
// puedes ver como agregamos la función a nuestro objeto global window
function llenar()
{
  const data= INJURIES;
  for (let i = 0; i < data.length; i++) {
    //arrayYear.push(data[i].Year.slice(0,4));
    let varyear=data[i].Year.slice(0,4);
    document.getElementById("lista").innerHTML += "<option value='"+varyear+"'>"+varyear+"</option>"; 
  }

//función donde recorreré el arreglo de objetos para acceder a su propiedad name
/*const listYear = (data) => {

  //let arrayYear = []; // arreglo vacío donde pushearé los year nuevos.
  
 for (let i = 0; i < data.length; i++) {
  //arrayYear.push(data[i].Year.slice(0,4));
  let anio=data[i].Year.slice(0,4);
  document.getElementById("lista").innerHTML += "<option value='"+anio+"'>"+anio+"</option>"; 
}
 }
//   return nombres; //retorno el arreglo de nombres para que pueda tomarlo desde el archivo main.js
// y hacer la visualización de datos con el DOM
listYear(data);
*/
}
//window.example = example;

































