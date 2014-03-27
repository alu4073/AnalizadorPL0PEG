
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

program = b:(block)+ DOT { return {program:b }; }

block =  CONST c:(constants)+ SEMICOLON { return {type: 'CONST', value:c }; }
      /  VAR v:(identificators)+ SEMICOLON { return {type: 'VAR', value:v }; }
      /  p:(process)* s:st { return { procedure:p, sentence:s }; }

constants = COMMA i:ID ASSIGN n:NUMBER { return {type: '=', ident:i, value:n }; }
          / i:ID ASSIGN n:NUMBER { return {type: '=', ident:i, value:n }; }

identificators = COMMA i:ID { return {ident:i}; }
               / i:ID  { return {ident:i}; }

arguments = COMMA VAR i:ID { return {ident:i}; }
          / VAR i:ID  { return {ident:i}; }

process = PROCEDURE i:ID LEFTPAR a:(arguments)+ RIGHTPAR COLON b:(block)+ END SEMICOLON { return {type: 'PROCEDURE', ident:i, arguments:a, block:b }; }
        / PROCEDURE i:ID COLON b:(block)+ END SEMICOLON { return {type: 'PROCEDURE', ident:i, block:b }; }

st     = i:ID ASSIGN e:exp SEMICOLON { return {type: 'ASSIGN', left: i, right: e}; }  /* Sentencia de asignación */     
       / i:ID ASSIGN e:exp { return {type: 'ASSIGN', left: i, right: e}; }   
       / IF c:cond THEN st:st ELSE sf:st  { return {type: 'IFELSE', condition:c, true_st:st, false_st:sf }; }
       / IF c:cond THEN s:st  { return {type: 'IF', condition:c, statement:s }; }
       / CALL i:ID LEFTPAR a:(identificators)+ RIGHTPAR SEMICOLON { return {type: 'CALL', value:i, arguments:a }; }
       / CALL i:ID SEMICOLON { return {type: 'CALL', value:i}; }
       / P e:exp  { return {type: 'P', value:e }; }
       / WHILE c:cond DO s:(st)+  { return {type: 'WHILE', condition:c, statement:s }; }
       / BEGIN s:(st)+ END SEMICOLON { return {type: 'BEGIN', statement:s }; }

cond   = ODD e:exp  { return {type: 'ODD', value:e }; }
       / e1:exp op:COMPARISON e2:exp  { return {type: op, left:e1, right:e2 }; }

exp    = t:term   r:(ADD term)*   { return tree(t,r); }

term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*

ASSIGN     = _ op:'=' _  { return op; }
ADD        = _ op:[+-] _ { return op; }
MUL        = _ op:[*/] _ { return op; }
COMPARISON = _ op:$([<>=!][=]) _ { return op; }
           / _ op:[<>] _ { return op; }

LEFTPAR  = _"("_
RIGHTPAR = _")"_
IF   = _ "if" _    /* Si lo pones despues de id da error porque lo caza ID */
THEN = _ "then" _
ELSE = _ "else" _
CALL = _ "call" _
P    = _ "p" _
ODD  = _ "odd" _
WHILE= _ "while" _
DO   = _ "do" _
BEGIN= _ "begin" _
END  = _ "end" _
CONST  = _ "const" _
VAR  = _ "var" _
PROCEDURE  = _ "procedure" _

ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'ID', value: id }; 
            }
NUMBER   = _ digits:$[0-9]+ _ 
            { 
              return { type: 'NUM', value: parseInt(digits, 10) }; 
            }
DOT  = _ "." _
SEMICOLON  = _ ";" _
COLON      = _ ":" _
COMMA      = _ "," _
