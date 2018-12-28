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
    document.getElementById("listYear").innerHTML += "<option value='"+resultYear[i]+"'>"+resultYear[i]+"</option>"; 
  }
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

































