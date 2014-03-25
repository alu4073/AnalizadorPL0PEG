/*
 * Classic example grammar, which recognizes simple arithmetic expressions like
 * "2*(3+4)". The parser generated from this grammar then AST.
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

st     = i:ID ASSIGN e:exp  { return {type: '=', left: i, right: e}; }  /* Sentencia de asignación */       
       / IF e:exp THEN st:st ELSE sf:st  { return {type: 'IFELSE', condition:e, true_st:st, false_st:sf }; }
       / IF e:exp THEN s:st  { return {type: 'IF', condition:e, statement:s }; }


exp    = t:term   r:(ADD term)*   { return tree(t,r); }
term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*

ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
IF = _ "if" _    /* Si lo pones despues de id da error porque lo caza ID */
THEN = _ "then" _
ELSE = _ "else" _
ID       = _ id:$[a-zA-Z_][a-zA-Z_0-9]* _ 
            { 
              return { type: 'ID', value: id }; 
            }
NUMBER   = _ digits:$[0-9]+ _ 
            { 
              return { type: 'NUM', value: parseInt(digits, 10) }; 
            }
