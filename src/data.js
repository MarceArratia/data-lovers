//llenar lista por año
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
    return JSON.stringify(resultDataYear).split("Total_Injured_Persons");
}