//header
$('#feature.feature-region').append('<div align="center"><h3>THE ROLF INSTITUTE<sup>®</sup></h3><h4> For Healing and High Performance</h4></div>')

$(document).ready(function() {

//refine your search
$(".search-refine-button__text").html("Refine Your Search")

//filter buttons
  $('#home-page #search-form').append('<div id="callout-region">\
     Filter by:  <a href="/browse/bt/?sort=date"><img src="http://dev.rolf.org/BT-Dot.jpg" class="feature-legend-image" alt="BT" />&nbspBasic Training</a>&nbsp&nbsp\
      <a href="/browse/at/?sort=date"><img src="http://dev.rolf.org/AT-Dot.jpg" class="feature-legend-image" alt="AT" />&nbspAdvancedTraining</a>&nbsp&nbsp\
      <a href="/browse/rmi/?sort=date"><img src="http://dev.rolf.org/RM-Dot.jpg" class="feature-legend-image" alt="Rolf Movement" />&nbspRolf Movement®</a>\&nbsp&nbsp\
      <a href="/browse/ce/?sort=date"><img src="http://dev.rolf.org/CE-Dot.jpg" class="feature-legend-image" alt="CE" />&nbspContinuing Education</a>\&nbsp&nbsp\
    </div>');

//listing page
$( "<p><b>Payment Options available on enrollment</b></p>" ).insertAfter( ".hero-region.jumbotron.container div.col-md-6 p.hero-action" );

$("a[href*='/enrollment/new']").text("ENROLL");

//closed enrollment
$("span.ProductEnrollment__Notice").html("This class is closed for online enrollment at this time. Please call us at 303-449-5903 with any questions.")

//enrollment form
$("p.text-center:contains('Already have an account?')").append('</br><span style="font-size:15px"><b><i>(Your Canvas login is the same as your Membership login.)</i></b></span><p></br>Need a Login?</br><a href="http://mms.rolf.org/members/invoice_rolf_registration_start.php?org_id=ROLF">Click Here to Request One</a></p><p>Forgot Your Password?</br><a href="https://mms.rolf.org/members/mlogin.php?org_id=ROLF&bounce=%2Fmembers%2Fmembers.php%3Forgcode%3DROLF">Click Here to Reset It</a></br><i>Please allow a few minutes after you reset it.</i></p>');
});


function onElementRendered(selector, cb, _attempts) {
  var el = $(selector);
  _attempts = ++_attempts || 1;
  if (el.length) return cb(el);
  if (_attempts == 60) return;
  setTimeout(function() {
    onElementRendered(selector, cb, _attempts);
  }, 250);
}

onElementRendered('.panel.RegistrationForm', function(el) {

  $('.panel.RegistrationForm .btn.btn-info.btn-block').remove();
  $('.panel.RegistrationForm').append('<button type="submit" class="btn btn-info btn-block" id="redirect-btn">Proceed to Payment</button>');
  $('#redirect-btn').click(function (e) {
     e.preventDefault();
     window.location.href=url;
  });
});

onElementRendered('div#listings .col-md-12 h3', function(e) {
  //no classes text
  var find_text = 'There are no courses or programs to display.';
  var replace_text = 'Online Registration coming soon. Call 303-449-5903 to register for Basic or Advanced Training classes.';
  var url_path = /^\/browse\/\w+/i;
  if(location.pathname.match(url_path)){
    var e = $("div#listings .col-md-12 h3:contains('"+find_text+"')");
    e.html(e.html().replace(find_text, replace_text));
  };
});

//Payment redirect
listingid = ENV.product.id;
useridnum = ENV.user.id;
url = 'http://mms.rolf.org/members/invoice_req.php' + '?org_id=Rolf' + '&listingid=' + listingid + '&userid=' + useridnum;
