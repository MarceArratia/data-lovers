global.window=global
global.chai=require("chai");
require('../src/data.js');
require('../src/main.js');



describe('main', () => {
  it('debería ser un objeto', () => {

    assert.equal(typeof order, 'object');
  
  });
});
