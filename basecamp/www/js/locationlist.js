$('body').addClass('ui-loading');

var serviceURL = "http://basecamp.blueridgeoutdoors.com/mobile-basecamp/Application/";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
	getPageList();
});

function getEmployeeList() {
    var page = getUrlVars()["page"];
    var post_type = getUrlVars()["post_type"];
	$.getJSON(serviceURL + 'json.php?page='+ page + '&post_type='+post_type, function(data) {
		$('#employeeList li').remove();
		var employees = data.markers1;
		$.each(employees, function(index, value) {
			$('#employeeList').append('<li><a rel="external" href="locationdetails.html?ID=' + value.ID + '">' +
            '<h4>' + value.post_title + '</h4>' +
            '<p>' + value.City +','+ value.State +'</p>' );
		});
		$('#employeeList').listview('refresh');
		$('body').removeClass('ui-loading');
	});
}

function getPageList() {
    var page = getUrlVars()["page"];
    var post_type = getUrlVars()["post_type"];
	$.getJSON(serviceURL + 'pagenum.php?page='+ page + '&post_type='+post_type, function(data) {
		var paged = data.pages;
		$.each(paged, function(index, value) {
            $('#pagenum').append('<ul><li><a data-role="button" rel="external" class="ui-link" data-prefetch href="locations.html?page=' + value + '&post_type='+ post_type +'">'+value+'</a>');
		});
	});
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}