var serviceURL = "http://basecamp.blueridgeoutdoors.com/mobile-basecamp/Application/";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	$.getJSON(serviceURL + 'getlocationfilter.php', function(data) {
		$('#employeeList li').remove();
		employees = data.markers1;
		$.each(employees, function(index, value) {
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + value.post_id + '">' +
					'<img src="pics/' + value.picture + '"/>' +
					'<h4>' + value.post_title + ' ' + value.lastName + '</h4>' +
					'<p>' + value.title + '</p>' +
					'<span class="ui-li-count">' + value.reportCount + '</span></a></li>');
		});
		$('#employeeList').listview('refresh');
	});
}