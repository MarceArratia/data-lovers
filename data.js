// Creando función para seleccionar año desde la base de datos
/*function llenar()
{
  const data= INJURIES;
  //
  for (let i = 0; i < data.length; i++) {
    let varyear=data[i].Year.slice(0,4);
    document.getElementById("lista").innerHTML += "<option value='"+varyear+"'>"+varyear+"</option>"; 
  }
}

//window.example = example;*/
//rescatar lista por año
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
  ranking();
}
//filtrado de datos
function filterDataYear(){
  //año que usuario selecciona
    let selectYear=document.getElementById("listYear").value;
    const data =INJURIES;
    //información filtrada por año
    let resultDataYear=[];
    resultDataYear=filterListYearBussines(data,selectYear);
    //crea diseño de gráfico
    graphTransport(resultDataYear);
}
//gráficos
function graphTransport(resultDataYear){
  //sumatoria de totales por medio de transporte
  let sumAir=0;
  let sumTrain=0;
  let sumWather=0;
  let sumRail=0;
  let sumUrban=0;
  let sumOther=0;
  console.log(resultDataYear);
  //creando filtro para gráficos
  for(let i=0;i<=resultDataYear.length;i++){

    if(!String(resultDataYear[i]).indexOf("_Air")==1 || !String(resultDataYear[i]).indexOf("_US_Air_Carrier")==1 || !String(resultDataYear[i]).indexOf("_General_Aviation")==1 ){
      let air=[];
      air=String(resultDataYear[i]).split(':');
      if(parseInt(air[1])){
        sumAir+=parseInt(air[1]);
      }
    }
    else{
      if(!String(resultDataYear[i]).indexOf("_Train")==1 || !String(resultDataYear[i]).indexOf("_Railroad")==1 || !String(resultDataYear[i]).indexOf("_Rail")==1 ){
        let train=[];
        train=String(resultDataYear[i]).split(':');
        if(parseInt(train[1])){
          sumTrain+=parseInt(train[1]);
        }
      }
      else{
        if(!String(resultDataYear[i]).indexOf("_Water")==1 || !String(resultDataYear[i]).indexOf("_Recreational_Boating")==1 || !String(resultDataYear[i]).indexOf("_Freight")==1 ){
          let wather=[];
          wather=String(resultDataYear[i]).split(':');
          if(parseInt(wather[1])){
            sumWather+=parseInt(wather[1]);
          }
        }
        else{
          if(!String(resultDataYear[i]).indexOf("_Bus")==1 || !String(resultDataYear[i]).indexOf("_Commuter")==1 || !String(resultDataYear[i]).indexOf("_Highway")==1 || !String(resultDataYear[i]).indexOf("_Motocyclists")==1  || !String(resultDataYear[i]).indexOf("_Truck")==1){
            let rail=[];
            rail=String(resultDataYear[i]).split(':');
            if(parseInt(rail[1])){
              sumRail+=parseInt(rail[1]);
            }
          }else{
            if(!String(resultDataYear[i]).indexOf("_Pedalcyclist")==1 || !String(resultDataYear[i]).indexOf("_Pedestrians")==1 || !String(resultDataYear[i]).indexOf("_Transit_Rail")==1 || !String(resultDataYear[i]).indexOf("_Trespassers")==1 || !String(resultDataYear[i]).indexOf("_Gas")==1 || !String(resultDataYear[i]).indexOf("_Passenger")==1){
              let urban = [];
              urban=String(resultDataYear[i]).split(':');
              if(parseInt(urban[1])){
                sumUrban+=parseInt(urban[1]);
              }
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
  console.log("el total de aire es ",sumAir);
  console.log("el total de Tren es ",sumTrain);
  console.log("el total de Agua es ",sumWather);
  console.log("el total de Carretera es ",sumRail);
  console.log("el total de Otros es ",sumOther);
  
  var data=google.visualization.arrayToDataTable(
    [
      ['Medio de Transporte', 'Total'],
      ['Aire',sumAir],
      ['Tren',sumTrain],
      ['Agua', sumWather],
      ['Carretera', sumRail],
      ['Urbano', sumUrban],
      ['Otros',sumOther],
    ]);
    var options = {
      title: 'Medios de transporte',
      pieHole: 0.4,
    };
    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

function ranking (){
  let data= INJURIES;
  let año = [];
  año = data.filter(function(x){
    return(x.Year.slice(0,4) == 2009);
  });
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
dataYear[23] = dataYear[23].replace("Total_Injured_Persons_Pedalcyclist","Ciclistas - Personas accidentadas");
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


dataYear.sort();
for (let i=0;i<=dataYear.length;i++){
  let cut = [];
  cut = String(dataYear[i]).split(":");
  document.getElementById("detalle").innerHTML += "<p>"+cut[0]+"</p>";
}
  


}
































