if  (ENV.current_user_roles.indexOf("teacher") >= 1){
$('#course_start_at').attr('disabled', 'disabled');
$('#course_conclude_at').attr('disabled', 'disabled');
};
