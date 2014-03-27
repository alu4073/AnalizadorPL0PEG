$(document).ready(function() {
  $('#parse').click(function() {
    try {
      var editor = $('.CodeMirror')[0].CodeMirror;
      var source = editor.getValue();
      var result = pl0.parse(source);
      $('#output').html(JSON.stringify(result,undefined,2));
    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
  });

  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      //input.innerHTML = contents;
      var editor = $('.CodeMirror')[0].CodeMirror;
      editor.setValue(contents);
    }
    r.readAsText(f);
  });

});

  

