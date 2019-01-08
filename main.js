

//window.example = example;
//Creando función para seleccionar año desde la base de datos
function fillListYear() {
  //constante que trae la información de la base de datos
  const data = INJURIES;
 //arreglo de años 
  let resultYear = [];
  resultYear = fillListYearBussines(data);
  //for para agregar años y mostrarlos en html
  for (let i = 0; i < resultYear.length; i++) {
    //porque +=
    document.getElementById("listYear").innerHTML += "<option value='"+resultYear[i]+"'>"+resultYear[i]+"</option>"; 
  }
}

//filtrado de datos , cambiar a data el filter(es un ciclo iterativos, que recorre el arreglo del objeto)
function filterDataYear(){
                                           
  //año que usuario selecciona
    let selectYear=document.getElementById("listYear").value;
    const data =INJURIES;
    //información filtrada por año
    let resultDataYear=[];
    resultDataYear=filterListYearBussines(data,selectYear);
    //funciones
    //dibuja gráfico filtrado por año
    graphTransport(resultDataYear);
    graphTransportTwo(resultDataYear);
    //creando top 10 anual
    ranking(resultDataYear);
    //calculando media
    half();
    //para ordenar
    order();
}
//1er gráfico filtro por Medio de Transporte
function graphTransport(resultDataYear){
  let recibeArrayGraphic = [];
  recibeArrayGraphic=constructGraphicOne(resultDataYear);
  //Gráfico 1 de google chart
  var data=google.visualization.arrayToDataTable(
    [
      ['Medio de Transporte', 'Total'],
      ['Aire',recibeArrayGraphic[0]],
      ['Tren',recibeArrayGraphic[1]],
      ['Agua', recibeArrayGraphic[2]],
      ['Carretera', recibeArrayGraphic[3]],
      ['Urbano', recibeArrayGraphic[4]],
      ['Otros',recibeArrayGraphic[5]],
    ]);
    var options = {
      title: 'Registro por Medios de transporte',
      pieHole: 0.4,
    };
    var chart = new google.visualization.PieChart(document.getElementById('graphTransport'));
  chart.draw(data, options);
}

//2do gráfico registro filtrando
function graphTransportTwo(resultDataYear){
let recibeArrayGraphicTwo = [];
recibeArrayGraphicTwo=constructGraphicTwo(resultDataYear);

  //Gráfico 2 de google chart
  var dataDos=google.visualization.arrayToDataTable(
    [
      ['Medio de Transporte', 'Total'],
      ['Dependencia Directa',recibeArrayGraphicTwo[0]],
      ['Dependencia Indirecta',recibeArrayGraphicTwo[1]],
      ['Otros', recibeArrayGraphicTwo[2]],
      
    ]);
    var options = {
      title: 'Registro por dependencia con Medio de Transporte',
      pieHole: 0.4,
    };
    var chart = new google.visualization.PieChart(document.getElementById('graphTransportTwo'));
    chart.draw(dataDos, options);
}
//ranking por mayor a menor por año
function ranking (resultDataYear){ 
  let varRanking = [,];
  varRanking = arrayRanking(); 
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
function half(){
  //rescatar data
  let data = INJURIES;
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
   // console.log(varArray);
    //se almacena string cortado por ","
    let position = [];
    position = varArray.split(",");
    //console.log(position);
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
  ArrayResultHalf= halfByDecade(arrayHalf);
  graphTransportDecade(ArrayResultHalf);

  
  //document.getElementById("MediaDiv").innerHTML=ArrayResultHalf;
}

function order (){
  let data= INJURIES;
  //creando enlase 
  let selectYear=document.getElementById("listYear").value;
  let año = [];
  año = data.filter(function(x){
  return(x.Year.slice(0,4) == selectYear);
  });
  //reemplazando palabras de inglés al español usando replace
  let dataYear=[];
  dataYear = JSON.stringify(año);
  dataYear = dataYear.split(",");
  dataYear[0] = dataYear[0].replace("Total_Injured_Persons","Personas accidentadas");
  dataYear[1] = dataYear[1].replace("Total_Injured_Persons_Air","Aire-Personas accidentadas");
  dataYear[2] = dataYear[2].replace("Total_Injured_Persons_Bus_Occupants","Bus - Personas accidentadas");
  dataYear[3] = dataYear[3].replace("Total_Injured_Persons_Commuter_Carrier","Conductor de transporte público - Personas accidentadas");
  dataYear[4] = dataYear[4].replace("Total_Injured_Persons_Employee_Or_Worker","Empleado o trabajador accidentado");
  dataYear[5] = dataYear[5].replace("Total_Injured_Persons_Freight_Vessel","Buque de Carga - Personas accidentadas");
  dataYear[6] = dataYear[6].replace("Total_Injured_Persons_Gas_Pipeline","Tubería de gas - Personas accidentadas");
  dataYear[7] = dataYear[7].replace("Total_Injured_Persons_General_Aviation","Aviación general-Personas accidentadas");
  dataYear[8] = dataYear[8].replace("Total_Injured_Persons_Hazardous_Liquid_Pipeline","Tubería de líquidos peligrosos - Personas accidentadas");
  dataYear[9] = dataYear[9].replace("Total_Injured_Persons_Highway","Autopista - Personas accidentadas");
  dataYear[10] = dataYear[10].replace("Total_Injured_Persons_Highway_Rail_Grade_Crossing","Cruce de grado de Ferrocarril de Carretera - Personas accidentadas");
  dataYear[11] = dataYear[11].replace("Total_Injured_Persons_Highway_Rail_Grade_Crossing_Railroads","Rieles de cruce de Ferrocarril de Carretea - Personas accidentadas");
  dataYear[12] = dataYear[12].replace("Total_Injured_Persons_Industrial_Or_Other","Industrial u otro - Personas accidentadas");
  dataYear[13] = dataYear[13].replace("Total_Injured_Persons_Motorcyclists","Motociclistas accidentados");
  dataYear[14] = dataYear[14].replace("Total_Injured_Persons_On_Demand_Air_Taxi","Taxi aéreo bajo demanda - Personas accidentadas");
  dataYear[15] = dataYear[15].replace("Total_Injured_Persons_Other_Counts","Otros recuentos - Personas accidentadas");
  dataYear[16] = dataYear[16].replace("Total_Injured_Persons_Other_Incident","Otro incidente - Personas accidentadas");
  dataYear[17] = dataYear[17].replace("Total_Injured_Persons_Other_Incident_Transit","Otro incidente de tránsito - Personas accidentadas ");
  dataYear[18] = dataYear[18].replace("Total_Injured_Persons_Other_Incidents","Otros incidentes - Personas accidentadas");
  dataYear[19] = dataYear[19].replace("Total_Injured_Persons_Other_Incidents_Railroads","Otros incidentes en rutas viales - Personas accidentadas");
  dataYear[20] = dataYear[20].replace("Total_Injured_Persons_Passenger_Car_Occupants","Pasajeros de coches - Personas accidentadas");
  dataYear[21] = dataYear[21].replace("Total_Injured_Persons_Passenger_Or_Occupant","Pasajero u ocupante - Personas accidentadas");
  dataYear[22] = dataYear[22].replace("Total_Injured_Persons_Passenger_Vessel","Buque de pasajeros - Personas accidentadas");
  dataYear[23] = dataYear[23].replace("Total_Injured_Persons_Pedalcyclist","Ciclistas - Personas accidentada");
  dataYear[24] = dataYear[24].replace("Total_Injured_Persons_Pedestrians","Peatones accidentados");
  dataYear[25] = dataYear[25].replace("Total_Injured_Persons_Pipeline","Tubería - Personas accidentados");
  dataYear[26] = dataYear[26].replace("Total_Injured_Persons_Rail","Rieles - Personas accidentados");
  dataYear[27] = dataYear[27].replace("Total_Injured_Persons_Rail_Freight","Transporte Ferroviario de mercancías - Personas accidentadas");
  dataYear[28] = dataYear[28].replace("Total_Injured_Persons_Rail_Freight_Highway_Rail_Grade_Crossing","Carreteras de ferrocarril - Personas accidentadas");
  dataYear[29] = dataYear[29].replace("Total_Injured_Persons_Rail_Freight_Other_Incidents","Transporte Ferroviario de mercancías otros incidentes - Personas accidentadas");
  dataYear[30] = dataYear[30].replace("Total_Injured_Persons_Rail_Freight_Train_Accidents","Accidentes Ferroviario de Tren de carga - Personas accidentadas");
  dataYear[31] = dataYear[31].replace("Total_Injured_Persons_Rail_Freight_Trespassers","Infractores de carga Ferroviaria - Personas accidentadas");
  dataYear[32] = dataYear[32].replace("Total_Injured_Persons_Rail_Road_Trespassers","Infractores de la vía Ferrea - Personas accidentadas");
  dataYear[33] = dataYear[33].replace("Total_Injured_Persons_Railroad","Ferrocarril - Personas accidentadas");
  dataYear[34] = dataYear[34].replace("Total_Injured_Persons_Railroad_Alone","Ferrocarril solo - Personas accidentadas");
  dataYear[35] = dataYear[35].replace("Total_Injured_Persons_Railroad_Train_Accidents","Tren del Ferrocarril - Personas accidentadas");
  dataYear[36] = dataYear[36].replace("Total_Injured_Persons_Recreational_Boating","Canotaje recreativo - Personas accidentadas");
  dataYear[37] = dataYear[37].replace("Total_Injured_Persons_Train_Accidents_Rail_Roads","Tren de Carretera de Ferrocarril - Personas accidentadas");
  dataYear[38] = dataYear[38].replace("Total_Injured_Persons_Transit_Non_Rail","Tránsito no Ferroviario - Personas accidentadas");
  dataYear[39] = dataYear[39].replace("Total_Injured_Persons_Transit_Rail","Carril de tránsito - Personas accidentadas");
  dataYear[40] = dataYear[40].replace("Total_Injured_Persons_Transit_Total","Tránsito total - Personas accidentadas");
  dataYear[41] = dataYear[41].replace("Total_Injured_Persons_Trespassers","Infractores accidentados");
  dataYear[42] = dataYear[42].replace("Total_Injured_Persons_Truck_Occupants_Large","Camiones pesados ocupantes - Personas accidentadas");
  dataYear[43] = dataYear[43].replace("Total_Injured_Persons_Truck_Occupants_Light","Camiones ligeros ocupantes - Personas accidentadas");
  dataYear[44] = dataYear[44].replace("Total_Injured_Persons_US_Air_Carrier","Aerolínea - Personas accidentadas");
  dataYear[45] = dataYear[45].replace("Total_Injured_Persons_Water","Agua - Personas accidentadas");
  dataYear[46] = dataYear[46].replace("Total_Injured_Persons_Water_Not_Related_To_Vessel_Casualties","Agua, no relacionado con las bajas de los buques - Personas accidentadas");
  dataYear[47] = dataYear[47].replace("Total_Injured_Persons_Water_Vessel_Related","Agua, relacionado con buques - Personas accidentadas");
  
  //ordenando la información por orden alfabético
  dataYear.sort();
  
  for (let i=0;i<=dataYear.length;i++){
  let cut = []; 
  cut = String(dataYear[i]).split(":"); 
  document.getElementById("orderList").innerHTML += "<p>"+cut[0]+"</p>";
  }
  }
  function graphTransportDecade(resultDataDecade){
    //Gráfico 3 de google chart
    var data=google.visualization.arrayToDataTable(
      [
        ['Década', 'Media'],
        ['1960-1970',resultDataDecade[0]],
        ['1970-1980',resultDataDecade[1]],
        ['1980-1990',resultDataDecade[2]],
        ['1990-2000',resultDataDecade[3]],
        ['2000-2010',resultDataDecade[4]],
        ['2010-2016',resultDataDecade[5]],
      ]);
      var options = {
        title : 'Cálculo de Media cada diez años', 
        vAxis: {title: 'Décadas'},
        hAxis: {title: 'Media de Accidentes (Por Décadas)'},
        seriesType: 'bars',
        series: {5: {type: 'line'}} 
      };
      var chart = new google.visualization.PieChart(document.getElementById('MediaDiv'));
    chart.draw(data, options);
  }
































