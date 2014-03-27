var assert = chai.assert;

suite('Tests', function(){
  test('Comprobación de asignación', function(){
    var aux = pl0.parse("variable = 150 .");
    assert.equal(aux.program[0].sentence.type, "ASSIGN")
  });

  test('Comprobación de suma', function(){
    var aux = pl0.parse("variable = 100 + 50 .")
    assert.equal(aux.program[0].sentence.right.type, "+")
  });

  test('Comprobación de multiplicación', function(){
    var aux = pl0.parse("variable = 5 * 10 .")
    assert.equal(aux.program[0].sentence.right.type, "*")
  });

  test('Comprobación de división', function(){
    var aux = pl0.parse("variable = 100 / 2 .")
    assert.equal(aux.program[0].sentence.right.type, "/")
  });

  test('Comprobación de precedencia de operadores', function(){
    var aux = pl0.parse("variable = 10 + 20 * 2 .")
    assert.equal(aux.program[0].sentence.right.type, "+")
    assert.equal(aux.program[0].sentence.right.right.type, "*")
  });

  test('Comprobación de comparación', function(){
    var aux = pl0.parse("if variable1 == 100 then variable2 = 200.")
    assert.equal(aux.program[0].sentence.condition.type, "==")
  });

  test('Comprobación de IF', function(){
    var aux = pl0.parse("if variable1 == 100 then variable2 = 200.")
    assert.equal(aux.program[0].sentence.type, "IF")
  });
  
   test('Comprobación de IF-ELSE', function(){
    var aux = pl0.parse("if variable1 == 100 then variable2 = 200 else variable3 = 300.")
    assert.equal(aux.program[0].sentence.type, "IFELSE")
  });

  test('Comprobación de BEGIN-END', function(){
    var aux = pl0.parse("begin variable1 = 150; variable2  = 200; end; .")
    assert.equal(aux.program[0].sentence.type, "BEGIN")
  });

  test('Comprobación de WHILE-DO', function(){
    var aux = pl0.parse("while variable == 250 do variable2 = variable3 - 1.")
    assert.equal(aux.program[0].sentence.type, "WHILE")
  });

  test('Comprobación de CALL', function(){
    var aux = pl0.parse("call miFuncion; .")
    assert.equal(aux.program[0].sentence.type, "CALL")
  });

  test('Comprobación de paso de argumentos en CALL', function(){
    var aux = pl0.parse("call miFuncion(a, b, c); .")
    assert.equal(aux.program[0].sentence.type, "CALL")
    assert.equal(aux.program[0].sentence.arguments[0].ident.value, "a")
    assert.equal(aux.program[0].sentence.arguments[1].ident.value, "b")
    assert.equal(aux.program[0].sentence.arguments[2].ident.value, "c")
  });
  
  test('Comprobación de paso de argumentos en PROCEDURE', function(){    
    var aux = pl0.parse("procedure miFuncion(var a, var b): begin a = 1; b = 2; end;end; x = 7 - 1; .")
    $('#output').html(JSON.stringify(aux,undefined,2));
    assert.match(output.innerHTML, /PROCEDURE/) 
    assert.equal(aux.program[0].procedure[0].arguments[0].ident.value, "a")
    assert.equal(aux.program[0].procedure[0].arguments[1].ident.value, "b")
  });

  test('Comprobación de recursividad a izquierdas', function(){
    var aux = pl0.parse("variable = 10 - 5 - 1 .");
    assert.equal(aux.program[0].sentence.type, "ASSIGN")
    assert.equal(aux.program[0].sentence.right.type, "-")
    assert.equal(aux.program[0].sentence.right.left.type, "-")
  });

  test('Comprobación de detección de errores', function(){
    assert.throws(function() { pl0.parse("var1 = 500"); }, /Expected "."/);
  });

});
