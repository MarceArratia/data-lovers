/*global INJURIES*/ 
/*global google*/ 
function readJson(){
  //fetch lee un archivo JSON, texto, imágenes.otros
  let returnData=[];
     fetch('data/injuries/injuries.json')//fetch dice donde está el archivo
      .then(res => res.json() )//promesa en res, implementa el JSON
      .then(data => {//promesa si se cumple escribe contenido de JSON
        fillListYear(data);
      });
      //console.log(JSON.parse(returnData));
      return returnData;    
  } 
//Creando función para seleccionar año desde la base de datos
let dataJsonF;
function fillListYear(dataJson) {
  //constante que trae la información de la base de datos
  //let data = readJson();
  const data = dataJson;
  dataJsonF=dataJson;
  //let dataJson = readJson();
//let data=JSON.parse(dataJson);
  //arreglo de años  
  let resultYear = [];
  resultYear = fillListYearBussines(data);//eslint-disable-line
  //for para agregar años y mostrarlos en html
  for (let i = 0; i < resultYear.length; i++) {
    //porque +=
    document.getElementById("listYear").innerHTML += "<option value='"+resultYear[i]+"'>"+resultYear[i]+"</option>"; 
  }
} 
//filtrado de datos , cambiar a data el filter(es un ciclo iterativos, que recorre el arreglo del objeto)
function filterDataYear(){ //eslint-disable-line                                      
  //año que usuario selecciona
    let selectYear=document.getElementById("listYear").value;
    let data=dataJsonF;
    console.log(data);
    //información filtrada por año
    let resultDataYear=[];
    resultDataYear=filterListYearBussines(data,selectYear);//eslint-disable-line
    //funciones
    //dibuja gráfico filtrado por año
    graphTransport(resultDataYear);
    graphTransportTwo(resultDataYear);
    //creando top 10 anual
    ranking(resultDataYear,data);
    //calculando media
    half(data);
    //para ordenar
    order(data);
}
//1er gráfico filtro por Medio de Transporte
function graphTransport(resultDataYear){
  let recibeArrayGraphic = [];
  recibeArrayGraphic=constructGraphicOne(resultDataYear);//eslint-disable-line
  //Gráfico 1 de google chart
  let data=google.visualization.arrayToDataTable(
    [
      ['Medio de Transporte', 'Total'],
      ['Aire',recibeArrayGraphic[0]],
      ['Tren',recibeArrayGraphic[1]],
      ['Agua', recibeArrayGraphic[2]],
      ['Carretera', recibeArrayGraphic[3]],
      ['Urbano', recibeArrayGraphic[4]],
      ['Otros',recibeArrayGraphic[5]],
    ]);
    let options = {
      title: '',
      width:507,
      height:200,
      pieHole: 0.4,
    };
    let chart = new google.visualization.PieChart(document.getElementById('graphTransport'));
  chart.draw(data, options);
}
//2do gráfico registro filtrando
function graphTransportTwo(resultDataYear){
let recibeArrayGraphicTwo = [];
recibeArrayGraphicTwo=constructGraphicTwo(resultDataYear);//eslint-disable-line
  //Gráfico 2 de google chart
  let dataDos=google.visualization.arrayToDataTable(
    [
      ['Medio de Transporte', 'Total'],
      ['Dependencia Directa',recibeArrayGraphicTwo[0]],
      ['Dependencia Indirecta',recibeArrayGraphicTwo[1]],
      ['Otros', recibeArrayGraphicTwo[2]],
      
    ]);
    let options = {
      title: '',
      width:507,
      height:200,
      pieHole: 1,
    };
    let chart = new google.visualization.PieChart(document.getElementById('graphTransportTwo'));
    chart.draw(dataDos, options);
}
//ranking por mayor a menor por año
function ranking (resultDataYear,dataJson){ //eslint-disable-line
  let varRanking = [];

  varRanking = arrayRanking(dataJson); //eslint-disable-line
//Mostrando Ranking de accidentes por año
document.getElementById("top10").innerHTML = "";
let table = "<table class='table' id='tablet'> <thead> <tr> <th scope='col'>#</th> <th scope='col'>Tipo de accidente</th> <th scope='col'>Total</th> </tr> </thead> <tbody>"
for (let i = 0;i<=10;i++){
  if (varRanking[0,i]!="undefined" && varRanking[i][1]>0){
    varRanking[0,i]= String(varRanking[0,i]).replace("[","");
    varRanking[0,i]= String(varRanking[0,i]).replace("{","");
    varRanking[0,i]= String(varRanking[0,i]).replace('"',"");
    varRanking[0,i]= String(varRanking[0,i]).replace('"'," ");
    let varSplit = String(varRanking[0,i]).split(",");
    table+="   <tr> <th scope='row'>"+i+"</th> <td>"+varSplit[0]+"</td> <td>"+varSplit[1]+"</td> </tr>"
    //th y tr son filas, td son columnas
  }
}
//tabla de ranking
table+="  </tbody> </table>"
document.getElementById("top10").innerHTML += table;
}
//función para calcular la media
function half(dataJson){
  //rescatar data 
let data = dataJson;
  let arrayHalf=[];
  //suma de los totales numéricos de data
  let sumHalf = 0;
  //cuenta cada vez que se suma un número para poder dividir y generar media
  let count = 0;
  //dividiendo objeto por años
  for (let i=0;i<data.length;i++){
    //crea variable de tipo string
    let varArray;
    //JSON.stringify convierte la posición del objeto en un String separado por ","
    varArray=JSON.stringify(data[i]);
    //se almacena string cortado por ","
    let position = [];
    position = varArray.split(",");
    //divide array en posiciones
    let anio=position[48].slice(8,12);
    for (let u=0;u<=position.length;u++){
        //cortar posicion por ":" con split
      let positionTwo = [];
      positionTwo = String(position[u]).split(":");
      //parseInt pregunta si es entero suma, si no, no hace nada
      if (parseInt(positionTwo[1])){          
        sumHalf += parseInt(positionTwo[1]);
        count += 1;
      }
    }
    // llenamos la primera posicion del arreglo con la suma y el conteo
      arrayHalf.push(anio+":"+sumHalf+":"+count);
      sumHalf=0;
      count=0;
  }
  let ArrayResultHalf = [];
  ArrayResultHalf= halfByDecade(arrayHalf);//eslint-disable-line
  graphTransportDecade(ArrayResultHalf);
}

function order (dataJson){
  let dataYear = [];
  let orderSelect = document.getElementById("orderSelect").value;
  dataYear = orderBy(orderSelect,dataJson);//eslint-disable-line
  let table = "<table class='table' id='tablet'> <thead> <tr> <th scope='col'>#</th> <th scope='col'>Tipo de accidente</th></tr> </thead> <tbody>"
  document.getElementById("orderList").innerHTML = "";
  for (let i=0;i<dataYear.length;i++){
    table+="   <tr> <th scope='row'>"+i+"</th> <td>"+dataYear[i]+"</td></tr>"
  }
  table+="  </tbody> </table>"
  document.getElementById("orderList").innerHTML += table;
  }
  function graphTransportDecade(resultDataDecade){
    //Gráfico 3 de google chart
    let data=google.visualization.arrayToDataTable(
      [
        ['Década', 'Media'],
        ['1960-1970',resultDataDecade[0]],
        ['1970-1980',resultDataDecade[1]],
        ['1980-1990',resultDataDecade[2]],
        ['1990-2000',resultDataDecade[3]],
        ['2000-2010',resultDataDecade[4]],
        ['2010-2016',resultDataDecade[5]],
      ]);
      let options = {
        title : 'Cálculo de Media cada diez años',       
        width: 650,
        height: 400,
        vAxis: {title: 'Décadas'},
        hAxis: {title: 'Media de Accidentes (Por Décadas)'},
        seriesType: 'bars',
        series: {5: {type: 'line'}} 
      };
      let chart = new google.visualization.ComboChart(document.getElementById('MediaDiv'));
    chart.draw(data, options);
  }
  //activacion de link "quienes somos" del menu navegacion-inicio


  
 

  window.fillListYear=fillListYear;

//activacion de link "quienes somos" del menu navegacion-inicio
document.getElementById("aboutUs").addEventListener("click",()=>{

  document.getElementById("graphics").style.display="none";
  
  document.getElementById("headsBack").style.display="none";
  
  document.getElementById("prevention").style.display="block";
  
  }) 
 //activacion de link "quienes somos" del menu navegacion-fin


 //activacion de link "contáctenos" del menu navegacion-inicio
document.getElementById("contactUs").addEventListener("click",()=>{

  document.getElementById("graphics").style.display="none";
  
  document.getElementById("headsBack").style.display="none";
  
  document.getElementById("contact").style.display="block";
  
  }) 
 //activacion de link "contáctenos" del menu navegacion-fin
























