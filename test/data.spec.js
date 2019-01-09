global.window=global
//variables de referencia de lo que se utilizará
let assert = require("chai").assert;
let mainTest=require('../src/data.js');
let INJURIES=require('../src/data/injuries/injuries');
let dataTest=INJURIES;
 /*eslint-disable*/
 //describe lo que se va a hacer(describe)
describe('comprueba que exista una función ordenar', () => {
    it('debería existir una funcion ordenar', () => {
      assert.exists(typeof mainTest.order, 'object');
    });
  });
  describe('comprueba que exista una función filtrar', () => {
    //it muestra los pasos del test
    it('debería existir una funcion Filtrar', () => {
      //assert variable global del chai, exists es una función que pregunta si existe algo
      assert.exists(typeof mainTest.filterListYearBussines, 'object');
    });
  });
   //pregunta por cálculo por década
  describe('comprueba que exista una función filtrar', () => {
    it('debería existir una funcion Calcular', () => {
      assert.exists(typeof mainTest.halfByDecade, 'object');
    }); 
  });
  //chequear que función retorne un dato
  describe('comprueba que retorne información', () => {
  it("comprobando el retorno de halfByDecade using: assert.typeOf(value,'value'): ", function() {
    result   = halfByDecade(dataTest);
    assert.exists(result);
  });  
});

