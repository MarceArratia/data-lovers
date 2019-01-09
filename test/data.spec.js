global.window=global
let assert = require("chai").assert;
let mainTest=require('../src/data.js');
let INJUERIES=require('../src/data/injuries/injuries');
let dataTest=INJUERIES;
 /*eslint-disable*/
describe('main', () => {
    it('debería existir una funcion ordenar', () => {
      assert.exists(typeof mainTest.order, 'object');
    });
  });

  describe('main', () => {
    it('debería existir una funcion Filtrar', () => {
      assert.exists(typeof mainTest.filterListYearBussines, 'object');
    });
  });

  describe('main', () => {
    it('debería existir una funcion Calcular', () => {
      assert.exists(typeof mainTest.halfByDecade, 'object');
    });
  });

  describe('main', () => {
  it("comprobando el retorno de halfByDecade using: assert.typeOf(value,'value'): ", function() {
    result   = halfByDecade(dataTest);
    assert.exists(result);
  });  
});

