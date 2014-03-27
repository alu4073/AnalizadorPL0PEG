var assert = chai.assert;

suite('Tests', function(){
  test('Comprobación de asignación', function(){
    var aux = pl0.parse("variable = 150 .");
    $('#output').html(JSON.stringify(aux,undefined,2));
    assert.match(output.innerHTML, /ASSIGN/) 
  });

  test('Comprobación de suma', function(){
    var aux = pl0.parse("variable = 100 + 50 .")

  });

  test('Comprobación de multiplicación', function(){
    var aux = pl0.parse("variable = 5 * 10 .")

  });

  test('Comprobación de división', function(){
    var aux = pl0.parse("variable = 100 / 2 .")
    
  });

  test('Comprobación de precedencia de operadores', function(){
    var aux = pl0.parse("variable = 10 + 20 * 2 .")

  });

  test('Comprobación de comparación', function(){
    var aux = pl0.parse("if variable1 == 100 then variable2 = 200.")

  });

  test('Comprobación de IF', function(){
    var aux = pl0.parse("if variable1 == 100 then variable2 = 200.")

  });
  
   test('Comprobación de IF-ELSE', function(){
    var aux = pl0.parse("if variable1 == 100 then variable2 = 200 else variable3 = 300.")

  });

  test('Comprobación de BEGIN-END', function(){
    var aux = pl0.parse("begin variable1 = 150; variable2  = 200; end; .")

  });

  test('Comprobación de WHILE-DO', function(){
    var aux = pl0.parse("while variable == 250 do variable2 = variable3 - 1.")

  });

  test('Comprobación de CALL', function(){
    var aux = pl0.parse("call miFuncion .")

  });

  test('Comprobación de paso de argumentos', function(){
    
  });

  test('Comprobación de recursividad a izquierdas', function(){
    var aux = pl0.parse("variable = 10 - 5 - 1 .");
    assert.equal(aux.program[0].sentences[0].sentence.type, "ASSIGN")
   
  });

  test('Comprobación de detección de errores', function(){
    assert.throws(function() { pl0.parse("var1 = 500"); }, /Expected "."/);
  });

});
