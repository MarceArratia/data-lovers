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