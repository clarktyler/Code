courseid = ENV.product.id;
useridnum = ENV.user.id;
url = 'http://mms.rolf.org/members/invoice_req.php' + '?org_id=Rolf' + '&courseid=' + courseid + '&userid=' + useridnum;

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
  $('.panel.RegistrationForm').append('<button type="submit" class="btn btn-info btn-block" id="redirect-btn">New Button</button>');
  $('#redirect-btn').click(function (e) {
     e.preventDefault();
     window.location.href=url;
  });

});
