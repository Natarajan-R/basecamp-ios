$('#detailsPage').live('pageshow', function(event) {
	var serviceURL = "http://basecamp.blueridgeoutdoors.com/mobile-basecamp/Application/";
	var ID = getUrlVars()["ID"];
	$.getJSON(serviceURL + 'getlocation.php?ID='+ID, displayLocation);
	$('body').removeClass('ui-loading');
});

function displayLocation(data) {
	
	var spot = data.location;
	$.each(spot, function(index, value) {   
        //var location = data.markers1;
        //console.log(data);
        //alert(data[0].post_title);
        //$('#locationPic').attr('src', 'pics/' + location.picture);
        $('#fullName').append(value.post_title);
        $('#locationTitle').append(value.City + ', ' + value.State + ' | ' + '<a href="tel:' + value.Phone + '">' + value.Phone + '</a>' + ' | ' + '<a href="' + value.URL + '">' + value.URL + '</a>');
        $('#city').append(value.post_content);
        var directionURL = "http://maps.google.com/maps?q="+value.geo_latitude+","+value.geo_longitude+"&t=m";
        $('#dirButton').append('<a href="'+ directionURL +'" target="_blank">Get Directions</a>');
        var mapdata = { destination: new google.maps.LatLng(value.geo_latitude, value.geo_longitude) };
        //Start page
        
        $('#map_square').gmap(
        { 'center' : mapdata.destination, 
            'zoom' : 12, 
            'mapTypeControl' : false, 
            'navigationControl' : false,
            'streetViewControl' : false, 
            'callback' : function(map) {
                $('#map_square').gmap('addMarker', 
                { 'position' : new google.maps.LatLng(value.geo_latitude, value.geo_longitude), 
                    'animation' : google.maps.Animation.DROP
                });
            }
        });
        $('#map_square').click( function() {
            $.mobile.changePage('#page-map');
        });
        
        //Create the fullscreen map, request display of directions
        var toggleval = true; // used for test case: static locations
        
        $('.refresh').live("click", function() {
            
            $('#map_canvas').gmap({
                'callback' : function(map) {
                    alert('Alert!');
                    // START: Tracking location with device geolocation
                    if ( navigator.geolocation ) { 
                        navigator.geolocation.getCurrentPosition ( 
                        function(position) {
                            
                            $('#map_canvas').gmap('displayDirections', 
                            { 'origin' : new google.maps.LatLng(position.coords.latitude,
                                position.coords.longitude), 
                                'destination' : mapdata.destination, 'travelMode' :
                                google.maps.DirectionsTravelMode.DRIVING},
                            { 'panel' : document.getElementById('dir_panel')},
                            function (success, result) {
                                if (success) {
                                    var center = result.routes[0].bounds.getCenter();
                                    $('#map_canvas').gmap('option', 'center', center);
                                    $($('#map_canvas').gmap('getMap')).triggerEvent('resize');
                                } else {
                                    alert('Unable to get route');
                                }
                            }
                            );         
                        }, 
                        function(){ 
                            alert('Unable to get location');
                            $.mobile.changePage('#detailsPage', 'slide'); 
                        }); 
                    }            
                    // END: Tracking location with device geolocation
                }
            });
            return false;
        });
        
        //Map page
        $('#page-map').live("pagecreate", function() {
            $('.refresh').trigger('click');
        });
        
        // Go to map page to see instruction detail (zoom) on map page
        $('#dir_panel').live("click", function() {
            $.mobile.changePage('#page-map', 'slide');
        });
        
        // Briefly show hint on using instruction tap/zoom
        $('#page-dir').live("pageshow", function() {
            $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"
            + "Tap any instruction" + "<br>" + "to see details on map" +"</h1></div>")
            .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
            .appendTo( $.mobile.pageContainer )
            .delay( 1400 )
            .fadeOut( 700, function(){
                $(this).remove();
            });
        });
    });
    
	//alert('Alert!');
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