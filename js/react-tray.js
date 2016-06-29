// THIS IS NOT SUPPORTED BY INSTRUCTURE, WORKS as of 12-4-15
$(document).ready(function() {
	var trayLinks = [
		{key: 'https://search.ebscohost.com/Community.aspx?user=anguillacc&password=password&profile=ehost&authtype=uid&ugt=62E771363C2635273716359632853E2224E367D36113689366E328E339133503&encid=22D731263C3635373766357632953C17345377C371C378C376C378C379C375C33013&IsAdminMobile=N&authpid=ehost', val: 'EBSCOhost'},
		{key: 'https://search.ebscohost.com/Community.aspx?user=anguillacc&password=password&profile=ehost&authtype=uid&ugt=62E771363C2635273716359632853E2224E367D36113689366E328E339133503&encid=22D731263C3635373766357632953C17345377C371C378C376C378C379C375C33013&IsAdminMobile=N&authpid=src', val: 'Student Research Center'},
		{key: 'https://search.ebscohost.com/Community.aspx?user=anguillacc&password=password&profile=ehost&authtype=uid&ugt=62E771363C2635273716359632853E2224E367D36113689366E328E339133503&encid=22D731263C3635373766357632953C17345377C371C378C376C378C379C375C33013&IsAdminMobile=N&authpid=src_ic', val: 'Explora Secondary Schools'}
		{key: 'https://search.ebscohost.com/Community.aspx?user=anguillacc&password=password&profile=ehost&authtype=uid&ugt=62E771363C2635273716359632853E2224E367D36113689366E328E339133503&encid=22D731263C3635373766357632953C17345377C371C378C376C378C379C375C33013&IsAdminMobile=N&authpid=ehed', val: 'Explora Educators Edition'}
	 ];

	var slide_out_title = "Resources" //Changes the title on the slide out menu
	var global_nav_name = "Resources" //Change the title on the global navigation menu

	var footerContent = 'Footer text area. Put whatever you want here.'; //Changes the text of the bottom on the slide out tray
	////////////////////////////////////////////////////////////////////////////////
	//DO NOT EDIT ANYTHING BELOW THIS LINE!
	////////////////////////////////////////////////////////////////////////////////

	//Browser Detection
	navigator.agentDetect = (function(){
	    var ua= navigator.userAgent, tem,
	    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	    if(/trident/i.test(M[1])){
	        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
	        return 'IE '+(tem[1] || '');
	    }
	    if(M[1]=== 'Chrome'){
	        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
	        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	    }
	    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
	    return M;
	})();

	//Array, 0 = browser, 1 = version
	var agent = navigator.agentDetect;
	var reactId;

	switch(agent[0]) {
	    case "Firefox":
	        reactId = "2";
	        break;
	    case "Safari":
	        reactId = "2";
	        break;
	    default:
	        reactId = "1";
	        break;
	}

	var displayVals = '';

	function displayLinks(element, index, array) {
		displayVals += '<li>';
		displayVals += '<a target="_blank" href="' + element.key + '">' + element.val + '</a>'; //Remove target="_blank" if you do not want the links to open in a new tab.
		displayVals += '</li>';
	}

	trayLinks.forEach(displayLinks);

	var trayHtml = '<div style="position:absolute;background:#fff;" class="ReactTray__Content ReactTray__Content--after-open " tabindex="-1" data-reactid=".' +
   reactId + '.0"><div class="ReactTray__layout" data-reactid=".' +
   reactId + '.0.0"><div class="ReactTray__primary-content" data-reactid=".' +
   reactId + '.0.0.0"><div class="ReactTray__header" data-reactid=".' +
   reactId + '.0.0.0.0"><h1 class="ReactTray__headline" data-reactid=".' +
   reactId + '.0.0.0.0.0">' +
   slide_out_title + '</h1><button class="Button Button--icon-action ReactTray__closeBtn" type="button" data-reactid=".' +
   reactId + '.0.0.0.0.1"><i class="icon-x" data-reactid=".' +
   reactId + '.0.0.0.0.1.0"></i><span class="screenreader-only" data-reactid=".' +
   reactId + '.0.0.0.0.1.1">Close</span></button></div><ul class="ReactTray__link-list" data-reactid=".' +
   reactId + '.0.0.0.1">' +
   displayVals + '</ul></div><div class="ReactTray__secondary-content" data-reactid=".' +
   reactId + '.0.0.1"><div class="ReactTray__info-box" data-reactid=".' +
   reactId + '.0.0.1.0">' +
   footerContent + '</div></div></div></div>' +
   '<script>$(\'.Button.Button--icon-action.ReactTray__closeBtn, .Button.Button--icon-action.ReactTray__closeBtn .icon-x\').click(function () {$(\'.ReactTrayPortal div\').removeAttr(\'style\');$(\'.ReactTrayPortal div\').removeAttr(\'class\');$(\'.ReactTrayPortal div\').html("");$(\'#menu, .menu-item.ic-app-header__menu-list-item a\').removeClass(\'ui-state-disabled\').removeAttr(\'disabled\');$(\'#customTrayOverlay\').hide();$(\'#custom_nav\').css(\'background-color\', \'\');$(\'.icon-resources\').css(\'color\', \'#fff\');});</script>';

	trayHtml = trayHtml.replace(/(?:\r\n|\r|\n|  )/g, '');

	var menu = $('#menu');
	if (!menu.length) return;
	var custom_nav = $('<li/>', {
		'id': 'custom_nav',
		'class': 'menu-item ic-app-header__menu-list-item',
		html: '<a id="global_nav_resources_link" href="javascript:void(0)" class="ic-app-header__menu-list-link">' +
		'<div class="menu-item-icon-container" aria-hidden="true">' +
		'<i class="ic-icon-svg icon-resources"></i>' +
		'<div class="menu-item__text">' + global_nav_name + '</div>' +
		'</div></a></li>'
	});

	menu.append(custom_nav);

	$('body').append('<div id="customTrayOverlay" style="width:' + $('#menu').width() + 'px;height: ' + $('#menu').height() + 'px;position: absolute;left: 0;top: 87px;z-index: 999;display:none;"></div>');

	$('#global_nav_resources_link').click(function () {
		$('.ReactTrayPortal div').addClass('ReactTray__Overlay ReactTray__Overlay--after-open');
		$('.ReactTrayPortal div').css({
			'position' : 'fixed',
			'top' : '0px',
			'left': '0px',
			'right' : '0px',
			'bottom': '0px'
		});

		$('.ReactTrayPortal div').append(trayHtml);
		$('#menu, .menu-item.ic-app-header__menu-list-item a').addClass('ui-state-disabled').attr('disabled', 'disabled');
		$('#customTrayOverlay').show();
		$('#custom_nav').css('background-color', '#fff');

	});
});
