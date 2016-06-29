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
$('#course_name.course_form').attr('disabled', 'disabled');
$('#course_course_code').attr('disabled', 'disabled');
$('#course_time_zone').attr('disabled', 'disabled');
$('#course_sis_source_id').attr('disabled', 'disabled');
$('#course_account_id').attr('disabled', 'disabled');
$('#course_enrollment_term_id').attr('disabled', 'disabled');
$('#course_enrollment_term_id').attr('disabled', 'disabled');
$('#course_start_at').attr('disabled', 'disabled');
$('#course_conclude_at').attr('disabled', 'disabled');
