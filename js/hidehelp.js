//Hide report a problem
$(document).ready(function(){
// set timeout
var tid = setTimeout(mycode, 250);
function mycode() {
  //Hide Report a Problem Link from everyone regardless of role
  $('#help-dialog-options a[href=#create_ticket]').parent() .hide();
   tid = setTimeout(mycode, 250); // repeat myself
}
});