/* Stock file for use as Canvas global javascript file

This file HIDES:
For all users
- Delete My Account

For teachers all pages:
- Commons

For teachers Settings page:
- Reset Course Content
- Conclude this Course
- Import Content into this Course
- Export Course Content
- Permanently Delete this Course
- Navigation (Settings tab)
- Apps (Settings tab)
- Visibility options

For teachers Home page:
- Next Steps wizard
- Unpublished reminder

For Students:
- Breadcrumb trail

This file ADDS:
For Admins:
- Admin button


Last update: November, 2015
*/


$(function() {

    var docUrl = document.URL; // Get the page URL once, for use multiple times  

    // Changes for all users go below this line ----------------------------------------------

    // Alter the user profile page
    if (docUrl.indexOf("about") > 0 || docUrl.indexOf("profile") > 0) {
        $("a:contains('Delete My Account')").hide();
    }



    // End of changes for all users ---------------------------------------


    // Loop thru user roles provided by Canvas ENV object    
    var isAdmin = false;
    var isTeacher = false;
    // var isStudent = false;
    for (var i = ENV.current_user_roles.length - 1; i > -1; i--) {
        switch (ENV.current_user_roles[i]) {
            case 'admin':
                isAdmin = true;

                // Admin-only changes go below this line  -----------------------------

				// Adds an Admin button to the menu
                $("#menu").append("<li id='admincustom_menu_item' class='menu-item'> <a href='/accounts/self' class='menu-item-no-drop'>Admin</a></li>");
				


                // End of Admin-only changes -------------------------------
                break;
                
            case 'teacher':
                isTeacher = true;
                if (!isAdmin) {

                    // Teacher-only changes go below this line ----------------------------

					$("a:contains('Commons')").hide();
					
                    // Changes to Settings page 
                    if (docUrl.indexOf("settings") > 0) {
                        $("a:contains('Reset Course Content')").hide();
                        $("a:contains('Conclude this Course')").hide();
                        $("a:contains('Import Content into this Course')").hide();
                        $("a:contains('Export Course Content')").hide();
                        $("a:contains('Navigation')").hide();
                        $("a:contains('Apps')").hide();
                        $("a:contains('Permanently Delete this Course')").hide();
						
						//The following removes the option to make a course public. 
						$('#course_visibility').hide();

						
                    }

					// To verify if on Home page
					var idx = docUrl.indexOf("courses/") + "courses/".length;
					var temp = docUrl.substring(idx);
					var idx2 = temp.indexOf("/");

					// Changes to Home page
					if (idx2 < 0 || idx2 == temp.length - 1) {
                        $("a:contains('Course Setup Checklist')").hide();
                        // $("a:contains('Choose Home Page')").hide();
                        
                        // Hides the reminder that the course needs to be published box. Leaves a white space - needs some cleaning up
						document.getElementsByClassName('reminder')[0].style.visibility='hidden';
                        
                        // Hides the Next Steps box after one second
                    	setTimeout(function(){
                    		$('#wizard_box').hide();}, 1000);
                    }


                    // End of Teacher-only changes -------------------------
                }
                break;
                
                
        }
        if (isTeacher) break; // Exit the loop early, to avoid checking the remaining roles
    }


    if (!isAdmin && !isTeacher) {
        // Student-only ----------------------------------------------------

        // ... student only actions here

        $('#breadcrumbs').hide();

        // End of Student-only changes -------------------------------------
    }


}); 


