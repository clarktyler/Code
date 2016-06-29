// JavaScript Document
////////////////////////
//Add Button to Header//
////////////////////////
(function() {
var menu = $('#menu');
if (!menu.length) return;
//Menu Item Support

var libHelp = $('<li/>', {
'class': 'menu-item',
html: '<a class="menu-item-title" href="/">DACC Resources<span class="menu-item-title-icon"></span></a><div class="menu-item-drop"><table cellspacing="0"><tbody><tr><td class="menu-item-drop-column">'+
'<h2 id="test" ></h2><ul class="menu-item-drop-column-list">'+
//List items
'<li><a href="http://dacc.nmsu.edu/library" target="_blank"><span class="name ellipsis">Library</span></a></li>'+
'<li><a href="http://registration.nmsu.edu/spring/important-dates-and-deadlines-spring/" target="_blank"><span class="name ellipsis">Dates</span></a></li>'+
'<li><a href="http://dacc.nmsu.edu/computer-labs/" target="_blank"><span class="name ellipsis">Computer Lab</span></a></li>'+
'<li><a href="http://dacc.nmsu.edu/VLIT" target="_blank"><span class="name ellipsis">Canvas Support (VLIT)</span></a></li>'+
'<li><a href="http://dacc.nmsu.edu/syllabus/" target="_blank"><span class="name ellipsis">Syllabus Information</span></a></li>'+
//Ending
'</ul></td></tr></tbody></table></div>'
});

menu.append(libHelp).append(support);
})();