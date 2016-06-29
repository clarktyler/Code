///////////////Login Page Background Script////////////////////////

   $(function() {
	var loginMessage = "<style type='text/css'>.login-announce p {color:#ffffff; margin-top:8px; padding-top:0px;} .login-announce h2 {color:#ffffff; margin-bottom:0px; padding-bottom:0px;} .login-announce a:link {color:#ffffff;} .login-announce a:hover {color:#ffffff;} .login-announce a:visited {color:#ffffff;} .login-announce a:active {color:#ffffff;}</style>";
	    loginMessage += "<div class='login-announce'><blockquote>";
	    loginMessage += "<h2>Announcements</h2>";
		loginMessage += "<p>Canvas Guides<p>";
	    loginMessage += "<p>If you are having some how-to issues, check out Canvas Guides for both <a href='https://guides.instructure.com/m/4152' target='_blank'>[Instructors]</a> and <a href='https://guides.instructure.com/m/4212' target='_blank'>[Students]</a> to help get you on your way.</p>"
//	    loginMessage += "";
//	    loginMessage += "";
	    loginMessage += "</blockquote></div>"
		loginMessage += "<div class='login-announce'><blockquote>";
	    loginMessage += "<h2>Daily Digest</h2><p>";
	    loginMessage += "<a href='{url}' target='_blank'>- {display text} </a><br />";
	    loginMessage += "<a href='{url}' target='_blank'>- {display text} </a><br />";
	    loginMessage += "<a href='{url}' target='_blank'>- {display text} </a><br />";
	    loginMessage += "<a href='{url}' target='_blank'>- {display text} </a><br />";
	    loginMessage += "<a href='{url}' target='_blank'>- {display text} </a><br />";
	    loginMessage += "</p>";
	    loginMessage += "</blockquote></div>"

	$(loginMessage).insertBefore( "div.ic-Login-footer__links" );

   });
