//llenar lista por año
/*global INJURIES*/ 
//(declara INJURIES como variable global, según eslint)
//para trabajarlo en el negocio
window.onload=readJson;
function readJson(){
  //fetch lee un archivo JSON, texto, imágenes.otros
     fetch('./data/injuries/injuries.json')//fetch dice donde está el archivo
      .then(res => res.json() )//promesa en res, implementa el JSON
      .then(data => {//promesa si se cumple escribe contenido de JSON
        console.log(data);
            })
     } 
  
function fillListYearBussines(data) {
  let arrayYear = [];
  for (let i = 0 ; i<data.length ; i++) {
      arrayYear.push(data[i].Year.slice(0,4));
 
  }  
  return arrayYear; 
} 
//Función de filtrado por año
function filterListYearBussines(data,YearA) {
  let resultDataYear=[];
  resultDataYear=data.filter(function(fil){
      return (fil.Year.slice(0,4)===YearA);
  });
  //stringify convierte en string una estructura de JSON
  return JSON.stringify(resultDataYear).split("Total_Injured_Persons");
}
//funcion para hacer la media por decadas
function halfByDecade(arrayHalf){
  //variables para identificar suma de todos los elementos con cifras en cada década
  let decadeSumA = 0;
  let decadeSumB = 0;
  let decadeSumC = 0;
  let decadeSumD = 0;
  let decadeSumE = 0;
  let decadeSumF = 0;
  //variables para identificar cuántos elementos estaban contenidos en el año
  let decadeCountA = 0;
  let decadeCountB = 0;
  let decadeCountC = 0;
  let decadeCountD = 0;
  let decadeCountE = 0;
  let decadeCountF = 0;
  //variable que guarda el resultado del cálculo de la década
  let ArrayResultHalf = [];
  for(let i=0;i<arrayHalf.length;i++){
      let arrayCut=String(arrayHalf[i]).split(":");
      //primera decada (1960-1970)
      if(parseInt(arrayCut[0])>=1960 && parseInt(arrayCut[0])<=1970){
          decadeSumA += parseInt(arrayCut[1]);
          decadeCountA += parseInt(arrayCut[2]);
      }
      //segunda decada (1971-1980)
      if(parseInt(arrayCut[0])>=1971 && parseInt(arrayCut[0])<=1980){
          decadeSumB += parseInt(arrayCut[1]);
          decadeCountB += parseInt(arrayCut[2]);
      }
      //tercera decada (1981-1990)
      if(parseInt(arrayCut[0])>=1981 && parseInt(arrayCut[0])<=1990){
          decadeSumC += parseInt(arrayCut[1]);
          decadeCountC += parseInt(arrayCut[2]);
      }
      //cuarta decada (1991-2000)
      if(parseInt(arrayCut[0])>=1991 && parseInt(arrayCut[0])<=2000){
          decadeSumD += parseInt(arrayCut[1]);
          decadeCountD += parseInt(arrayCut[2]);
      }
      //quinta decada (2001-2010)
      if(parseInt(arrayCut[0])>=2001 && parseInt(arrayCut[0])<=2010){
          decadeSumE += parseInt(arrayCut[1]);
          decadeCountE += parseInt(arrayCut[2]);
      }
      //segunda decada (2011-2016)
      if(parseInt(arrayCut[0])>=2011 && parseInt(arrayCut[0])<=2016){
          decadeSumF += parseInt(arrayCut[1]);
          decadeCountF += parseInt(arrayCut[2]);
      }
  }
  //dejando resultado por decada según posición del array
  ArrayResultHalf[0]=decadeSumA/decadeCountA;
  ArrayResultHalf[1]=decadeSumB/decadeCountB;
  ArrayResultHalf[2]=decadeSumC/decadeCountC;
  ArrayResultHalf[3]=decadeSumD/decadeCountD;
  ArrayResultHalf[4]=decadeSumE/decadeCountE;
  ArrayResultHalf[5]=decadeSumF/decadeCountF;
  //se envía return para mostrar en main
  return ArrayResultHalf;
}
function constructGraphicOne(resultDataYear){
  //sumatoria de totales por medio de transporte
let sumAir=0;
let sumTrain=0;
let sumWather=0;
let sumRail=0;
let sumUrban=0;
let sumOther=0;
//creando filtro para gráficos
for(let i=0;i<=resultDataYear.length;i++){
//filtro por aire
  if(!String(resultDataYear[i]).indexOf("_Air")==1 || !String(resultDataYear[i]).indexOf("_US_Air_Carrier")==1 || !String(resultDataYear[i]).indexOf("_General_Aviation")==1 ){
    let air=[];
    air=String(resultDataYear[i]).split(':');
    if(parseInt(air[1])){
      sumAir+=parseInt(air[1]);
    }
  }
  //filtro por tren
  else{
    if(!String(resultDataYear[i]).indexOf("_Train")==1 || !String(resultDataYear[i]).indexOf("_Railroad")==1 || !String(resultDataYear[i]).indexOf("_Rail")==1 ){
      let train=[];
      train=String(resultDataYear[i]).split(':');
      if(parseInt(train[1])){
        sumTrain+=parseInt(train[1]);
      }
    }
    //filtro por agua
    else{
      if(!String(resultDataYear[i]).indexOf("_Water")==1 || !String(resultDataYear[i]).indexOf("_Recreational_Boating")==1 || !String(resultDataYear[i]).indexOf("_Freight")==1 ){
        let wather=[];
        wather=String(resultDataYear[i]).split(':');
        if(parseInt(wather[1])){
          sumWather+=parseInt(wather[1]);
        }
      }
     // filtro por carretera
      else{
        if(!String(resultDataYear[i]).indexOf("_Bus")==1 || !String(resultDataYear[i]).indexOf("_Commuter")==1 || !String(resultDataYear[i]).indexOf("_Highway")==1 || !String(resultDataYear[i]).indexOf("_Motocyclists")==1  || !String(resultDataYear[i]).indexOf("_Truck")==1){
          let rail=[];
          rail=String(resultDataYear[i]).split(':');
          if(parseInt(rail[1])){
            sumRail+=parseInt(rail[1]);
          }
          //filtro por urbano
        }else{
          if(!String(resultDataYear[i]).indexOf("_Pedalcyclist")==1 || !String(resultDataYear[i]).indexOf("_Pedestrians")==1 || !String(resultDataYear[i]).indexOf("_Transit_Rail")==1 || !String(resultDataYear[i]).indexOf("_Trespassers")==1 || !String(resultDataYear[i]).indexOf("_Gas")==1 || !String(resultDataYear[i]).indexOf("_Passenger")==1){
            let urban = [];
            urban=String(resultDataYear[i]).split(':');
            if(parseInt(urban[1])){
              sumUrban+=parseInt(urban[1]);
            }
            //filtro por otros
        }else{
          let other =[];
          other=String(resultDataYear[i]).split(':');
          if(parseInt(other[1])){
          sumOther+=parseInt(other[1]);
          }
          }
        }
      }
    }
  }
}
//creando arreglo para retornar los datos del gráfico 1
let arrayFillGraphicOne = [];
arrayFillGraphicOne[0] = sumAir;
arrayFillGraphicOne[1] = sumTrain;
arrayFillGraphicOne[2] = sumWather;
arrayFillGraphicOne[3] = sumRail;
arrayFillGraphicOne[4] = sumUrban;
arrayFillGraphicOne[5] = sumOther;
return arrayFillGraphicOne;

}
function constructGraphicTwo(resultDataYear){
//sumatoria de totales por dependencia e independencia con Medio de Transporte
let sumDependence=0;
let sumIndependence=0;  
let sumOtherTwo=0;
//creando filtro para gráficos 
for(let i=0;i<=resultDataYear.length;i++){
//filtro por depedencia
  if(!String(resultDataYear[i]).indexOf("_Employe")==1 || !String(resultDataYear[i]).indexOf("_Gas")==1 
  || !String(resultDataYear[i]).indexOf("_Hazardous")==1 || !String(resultDataYear[i]).indexOf("_Highway")==1 
  || !String(resultDataYear[i]).indexOf("_Industrial")==1 || !String(resultDataYear[i]).indexOf("_Pedestrians")==1 
  || !String(resultDataYear[i]).indexOf("_Pipeline")==1 || !String(resultDataYear[i]).indexOf("_Rail")==1 
  || !String(resultDataYear[i]).indexOf("_Grade")==1 || !String(resultDataYear[i]).indexOf("_Transit")==1 
  || !String(resultDataYear[i]).indexOf("_Road")==1 )
  {
    let dependence=[];
    dependence=String(resultDataYear[i]).split(':');
    if(parseInt(dependence[1])){
      sumDependence+=parseInt(dependence[1]);
    }
  //filtro por independencia
  }
  else{
    if(!String(resultDataYear[i]).indexOf("_Air")==1 || !String(resultDataYear[i]).indexOf("_Railroad")==1 
    || !String(resultDataYear[i]).indexOf("_Bus")==1  || !String(resultDataYear[i]).indexOf("_Commuter")==1  
    || !String(resultDataYear[i]).indexOf("_Freight")==1  || !String(resultDataYear[i]).indexOf("_General")==1  
    || !String(resultDataYear[i]).indexOf("_Motorcyclists")==1  || !String(resultDataYear[i]).indexOf("_On")==1  
    || !String(resultDataYear[i]).indexOf("_Passenger")==1  || !String(resultDataYear[i]).indexOf("_Pedalcyclist")==1  
    || !String(resultDataYear[i]).indexOf("_Boating")==1  || !String(resultDataYear[i]).indexOf("_Accidents")==1  
    || !String(resultDataYear[i]).indexOf("_Truck")==1  || !String(resultDataYear[i]).indexOf("_US")==1  
    || !String(resultDataYear[i]).indexOf("_Water")==1  )
    {
      let independence=[];
      independence=String(resultDataYear[i]).split(':');
      if(parseInt(independence[1]))
      {
        sumIndependence+=parseInt(independence[1]);
      }

    }else{    //filtro por otros
          let otherTwo =[];
          otherTwo=String(resultDataYear[i]).split(':');
          if(parseInt(otherTwo[1])){
            sumOtherTwo+=parseInt(otherTwo[1]);
          }
        }
    }
}
//creando arreglo para retornar los datos del gráfico 2
let arrayFillGraphicTwo = [];
arrayFillGraphicTwo[0]= sumDependence;
arrayFillGraphicTwo[1]= sumIndependence;
arrayFillGraphicTwo[2]= sumOtherTwo;
return arrayFillGraphicTwo;
}
function traslateReplace(dataYear){
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
return dataYear;
}
//arreglo para el ranking 
function arrayRanking(){  
  //rescatando data  
  let data= INJURIES;
  //lo que el usuario ingreso cuando escoge año
  let selectYear=document.getElementById("listYear").value;
  //información del año seleccionado
  let resulYearRanking = [];
  //filtrando el año
  resulYearRanking = data.filter(function(x){
  //return retorna la información del año seleccionado
  return(x.Year.slice(0,4) == selectYear);
  });
  //generando para guardar la información traducida
  let dataYear=[];
  //convirtiendo los datos de JSON en String separado por coma
dataYear = JSON.stringify(resulYearRanking);
  //cortando elementos por coma
dataYear = dataYear.split(",");
  //invocando la función que traduce
  dataYear = traslateReplace(dataYear);
//creando let para separar cifras de mayor a menor 
let varRanking=[];
for (let i = 0;i<=dataYear.length;i++){ 
  let replaceNull=[];
  replaceNull = String(dataYear[i]).split(":"); 
if (replaceNull[1] == "null"){
  replaceNull[1] = 0;
}else{
  replaceNull[1] = parseInt(replaceNull[1]);
}
varRanking.push(replaceNull);
}
//creando funcion para ordenando de mayor a menor según la posicion del arreglo
varRanking.sort(function(a,b){
  return b[1] - a[1];
});
return varRanking;//retorna arreglo ordenado
}
//funcion para ordenar alfabéticamente
function orderBy(selectOrder){
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
  dataYear = traslateReplace(dataYear);
  let orderClean =[];
  for (let i=0;i<dataYear.length;i++){
  let clean =[];
  clean=dataYear[i].split(":");
  clean[0]= String(clean[0]).replace("[","");
  clean[0]= String(clean[0]).replace("{","");
  clean[0]= String(clean[0]).replace('"',"");
  clean[0]= String(clean[0]).replace('"'," ");
  clean[0]= String(clean[0]).replace('Year'," ");
  if(clean[0] != "Year") 
  {
    //push para agregar un elemento al arreglo, clean para limpiar los caracteres 
      orderClean.push(clean[0]);
  }
  }
  if (selectOrder == 1){
      orderClean.sort();
  }else{
     orderClean.sort();
     orderClean.reverse();
  }
  return orderClean;
}
//instancia para los test
window.orderBy=orderBy;
window.arrayRanking=arrayRanking;
window.traslateReplace=traslateReplace;
window.constructGraphicTwo=constructGraphicTwo;
window.constructGraphicOne=constructGraphicOne;
window.halfByDecade=halfByDecade;
window.filterListYearBussines=filterListYearBussines;
window.fillListYearBussines=fillListYearBussines;