$(document).ready(function () {

    var docUrl = document.URL;  // Get the page URL once, for use multiple times

    // Changes for all users go below this line ----------------------------------------------

    
// Alter the user profile page
    if (docUrl.indexOf("about") > 0 || docUrl.indexOf("profile") > 0) {
        $("a:contains('Delete My Account')").hide();
    }

//This adds the box below the login page
 if (window.location.pathname.indexOf('login') > 0 )
{
$('<br /><div class="loginNote" style= "margin: 0px auto; margin-top: -10px; position:center; top:600px; left:420px; height: 105px; width: 510px;text-align:left; background-color:#b7dbfi; border:medium; border:solid; padding:5px; margin-bottom:20px;"> <span style="color:#0033FF"><b>Login:</b></span> Your ctcLink ID<br><span style="color:#0033FF"><b> Password:</b></span> Your ctcLink password <br><b>NOTE:</b> You can activate your account or reset your password by visiting: <b><a href="https://ctclink.spokane.edu"> https://ctclink.spokane.edu </a></b></br></div>').insertAfter('#footer');




        }
//This changes the login form placeholders on both desktop and mobile login pages.
//What it does is gets your doman and makes sure that the changes only apply to your login page
    var url = 'https://'
    url += window.location.hostname;
    url += '/login';
//alert(url);
//alert(window.location.href);
    if (window.location.href == url) {
        var sp = $('#login_form label[for=pseudonym_session_unique_id]>span');
        sp.text('');
        //This Changes the Mobile Login Form to show Student or Instructor ID
        document.getElementsByName('pseudonym_session[unique_id]')[0].placeholder = 'Student SID#';
    }

    if (window.location.pathname.search('enroll')) {
        var enrollText = $("p:contains('Please enter your email and password:')");
        enrollText.text('Please enter your Student ID:');
        var enrollSp = $("label.control-label:[for=student_email]contains('Email')");
        enrollSp.text('Student ID');
    }
//This is the JS for altering the footer links on the login page etc.:
//Footer cleanup
//Remove old
    $("a[href='http://www.instructure.com/privacy-policy']").remove();
    $("a[href='http://www.instructure.com/terms-of-use']").remove();
    $("a[href='http://facebook.com/instructure']").remove();
    $("a[href='http://twitter.com/instructure']").remove();

//This code changes the text on the 'forgot password' screen
    $("#forgot_password_form > p").html("<p>Enter your login and we'll send you a link so you can change your password.</p>");
    $("#forgot_password_form > div > span.field-with-fancyplaceholder > label").html("<span>login</span>");
   // $("#forgot_password_form > div > span.field-with-fancyplaceholder > label").html("<span title="This field is required">*</span>").remove();

//Add new
    $('#footer-links').append('<a href="http://guides.instructure.com/s/2204/m/4214/l/41056-which-browsers-does-canvas-support" target="_blank">Supported Browsers</a>');

//After footer
    $('a#login_forgot_password').text('How do I reset my password?');

   // $('.login-options').append('<br/><a id="login_forgot_password" class="show_password_hint" href="#">What is my default password?</a>');
// $('div#forgot_password_form').text($(this).attr("data-text"));


//Script to show password hint.
    $(".show_password_hint").click(function () {
        $(".loginNote").toggleClass("hidden");
    });


    $('<div class="loginNote student-login-help hidden"><div style="width:100%; float:left; margin-top:10px; padding:5%; text-align:left;"><p style="font-size:2em;">Students:</p><p>Your password is the first 6 letters of your last name.</p><p>If it&#39;s less than 6 letters, repeat until you reach 6.</p><p>e.g. Clark Kent&#39;s password is <span style="font-weight:bold;">kentke</span>.</p></div></div>').insertAfter('#modal-box-inner');
$(function() {
  console.log("CANVABADGES: Loaded!");
  // NOTE: if pasting this code into another script, you'll need to manually change the
  // next line. Instead of assigning the value null, you need to assign the value of
  // the Canvabadges domain, i.e. "https://www.canvabadges.org". If you have a custom
  // domain configured then it'll be something like "https://www.canvabadges.org/_my_site"
  // instead.
  var protocol_and_host = null;
  if(!protocol_and_host) {
    var $scripts = $("script");
    $("script").each(function() {
      var src = $(this).attr('src');
      if(src && src.match(/canvas_profile_badges/)) {
        var splits = src.split(/\//);
        protocol_and_host = splits[0] + "//" + splits[2];
      }
      var prefix = src && src.match(/\?path_prefix=\/(\w+)/);
      if(prefix && prefix[1]) {
        protocol_and_host = protocol_and_host + "/" + prefix[1];
      }
    });
  }
  if(!protocol_and_host) {
    console.log("CANVABADGES: Couldn't find a valid protocol and host. Canvabadges will not appear on profile pages until this is fixed.");
  }
  var match = location.href.match(/\/(users|about)\/(\d+)$/);
  if(match && protocol_and_host) {
    console.log("CANVABADGES: This page shows badges! Loading...");
    var user_id = match[2];
    var domain = location.host;
    var url = protocol_and_host + "/api/v1/badges/public/" + user_id + "/" + encodeURIComponent(domain) + ".json";
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: url,
      success: function(data) {
        console.log("CANVABADGES: Data retrieved!");
        if(data.objects && data.objects.length > 0) {
          console.log("CANVABADGES: Badges found! Adding to the page...");
          var $box = $("<div/>", {style: 'margin-bottom: 20px;'});
          $box.append("<h2 class='border border-b'>Badges</h2>");
          for(idx in data.objects) {
            var badge = data.objects[idx];
            var $badge = $("<div/>", {style: 'float: left;'});
            var link = protocol_and_host + "/badges/criteria/" + badge.config_id + "/" + badge.config_nonce + "?user=" + badge.nonce;
            var $a = $("<a/>", {href: link});
            $a.append($("<img/>", {src: badge.image_url, style: 'width: 72px; height: 72px; padding-right: 10px;'}));
            $badge.append($a);
            $box.append($badge);
          }
          $box.append($("<div/>", {style: 'clear: left'}));
          $("#edit_profile_form,fieldset#courses,.more_user_information + div").after($box);
        } else {
          console.log("CANVABADGES: No badges found for the user: " + user_id + " at " + domain);
        }
      },
      error: function(err) {
        console.log("CANVABADGES: Badges failed to load, API error response");
        console.log(err);
      },
      timeout: 5000
    });
  } else {
    console.log("CANVABADGES: This page doesn't show badges");
  }
});
   // Canvas Badges ---------------------------------------------
   $(function() {
  console.log("CANVABADGES: Loaded!");
  // NOTE: if pasting this code into another script, you'll need to manually change the
  // next line. Instead of assigning the value null, you need to assign the value of
  // the Canvabadges domain, i.e. "https://www.canvabadges.org". If you have a custom
  // domain configured then it'll be something like "https://www.canvabadges.org/_my_site"
  // instead.
  var protocol_and_host = "https://ccs.instructure.com";
  if(!protocol_and_host) {
    var $scripts = $("script");
    $("script").each(function() {
      var src = $(this).attr('src');
      if(src && src.match(/canvas_profile_badges/)) {
        var splits = src.split(/\//);
        protocol_and_host = splits[0] + "//" + splits[2];
      }
      var prefix = src && src.match(/\?path_prefix=\/(\w+)/);
      if(prefix && prefix[1]) {
        protocol_and_host = protocol_and_host + "/" + prefix[1];
      }
    });
  }
  if(!protocol_and_host) {
    console.log("CANVABADGES: Couldn't find a valid protocol and host. Canvabadges will not appear on profile pages until this is fixed.");
  }
  var match = location.href.match(/\/(users|about)\/(\d+)$/);
  if(match && protocol_and_host) {
    console.log("CANVABADGES: This page shows badges! Loading...");
    var user_id = match[2];
    var domain = location.host;
    var url = protocol_and_host + "/api/v1/badges/public/" + user_id + "/" + encodeURIComponent(domain) + ".json";
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: url,
      success: function(data) {
        console.log("CANVABADGES: Data retrieved!");
        if(data.objects && data.objects.length > 0) {
          console.log("CANVABADGES: Badges found! Adding to the page...");
          var $box = $("<div/>", {style: 'margin-bottom: 20px;'});
          $box.append("<h2 class='border border-b'>Badges</h2>");
          for(idx in data.objects) {
            var badge = data.objects[idx];
            var $badge = $("<div/>", {style: 'float: left;'});
            var link = protocol_and_host + "/badges/criteria/" + badge.config_id + "/" + badge.config_nonce + "?user=" + badge.nonce;
            var $a = $("<a/>", {href: link});
            $a.append($("<img/>", {src: badge.image_url, style: 'width: 72px; height: 72px; padding-right: 10px;'}));
            $badge.append($a);
            $box.append($badge);
          }
          $box.append($("<div/>", {style: 'clear: left'}));
          $("#edit_profile_form,fieldset#courses,.more_user_information + div").after($box);
        } else {
          console.log("CANVABADGES: No badges found for the user: " + user_id + " at " + domain);
        }
      },
      error: function(err) {
        console.log("CANVABADGES: Badges failed to load, API error response");
        console.log(err);
      },
      timeout: 5000
    });
  } else {
    console.log("CANVABADGES: This page doesn't show badges");
  }
}); 
// End of changes for all users ---------------------------------------

// Loop thru user roles provided by Canvas ENV object
    var isAdmin = false;
    var isTeacher = false;
    for (var i = ENV.current_user_roles.length - 1; i > -1; i--) {
        switch (ENV.current_user_roles[i]) {
            case 'admin':
                isAdmin = true;

                // Admin-only changes go below this line  -----------------------------

                var rootAccountId = parseInt(ENV.DOMAIN_ROOT_ACCOUNT_ID, 10)-90000000000000;
                $("#menu").append("<li id='admincustom_menu_item' class='menu-item'> <a href='/accounts/" + rootAccountId + "' class='menu-item-no-drop'>Admin</a></li>");


                // End of Admin-only changes -------------------------------
                $('div.accordion').accordion();
                break;
            case 'teacher':
                isTeacher = true;
                if (!isAdmin) {

                    // Teacher-only changes go below this line ----------------------------
                    // Try to change things on a settings page - probably a course settings page
                    if (docUrl.indexOf("settings") > 0) {
                        $("a:contains('Permanently Delete this Course')").hide();
                        $("a:contains('Reset Course Content')").hide();
                        $("a:contains('Conclude this Course')").hide();
                    }


                    // End of Teacher-only changes -------------------------
                }
                break;
        }
        if (isTeacher) break;  // Exit the loop early, to avoid checking the remaining roles
    }


    if (!isAdmin && !isTeacher) {
        // Student-only ----------------------------------------------------

        // ... student only actions here


        // End of Student-only changes -------------------------------------
    }


// Login page edits
    if (docUrl.indexOf('login') > 0) {
        //$("label[for='pseudonym_session_unique_id']").html('<span>SID</span>');
    }

})
;
// --- Google Analytics code ---
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-53523596-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  // ---- End Google Analytics ----