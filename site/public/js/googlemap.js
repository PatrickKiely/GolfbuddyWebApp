
navigator.geolocation.getCurrentPosition(
  function(position){
    var xlatitude  = position.coords.latitude;
    var xlongitude = position.coords.longitude;
    var timestamp = new Date(position.timestamp);
  
  console.log("latlong : " + xlatitude + " - " + xlongitude)
 
var locations = [
['Royal County Down Golf Club', 54.217580, -5.886059,1],
['Portmarnock Championship Golf Club', 53.408339, -6.123579,1],
['Royal Portrush Golf Club', 55.201495, -6.640573,1],
['Waterville Golf Club', 51.842787, -10.194938,1],
['Ballybunion Golf Club', 52.493537, -9.675468,1],
['Lahinch Golf Club', 52.939894, -9.351835,1],
['Tralee Golf Club', 52.305539, -9.853928,1],
['The European Golf Club', 52.856153, -6.066662,1],
['County Louth Baltray Golf Club', 53.741684, -6.253161,1],
['Adare Manor Golf Club', 52.565172, -8.781437,1],
['My Location', xlatitude, xlongitude, 11],
['Williamstown', 52.231737, -7.090113, 12],
['Waterford Golf Club', 52.270748, -7.120154, 13],
['Waterford Castle Golf Club ', 52.249619, -7.056790,14],
['Tramore Golf Club', 52.157444, -7.170869,15],
['Dunmore East Golf Club', 52.157789, -6.987448,16],
['Dungarvan Golf Club', 52.109547, -7.589120,17],
['GoldCoast GolfClub', 52.081969, -7.565860,18],
['Lismore Golf Club', 52.145474, -7.944820,19],
['Faithlegg House Hotel & Golf Club', 52.258075, -7.024908,20],
['Carrick-on-Suir Golf Club', 52.334178, -7.408233,21],
['Clonmel Golf Club', 52.334851, -7.648192,22],
['New Ross Golf Club', 52.404155, -6.973151,23],
['Mt Juliet Estate Golf Club',52.520801, -7.191705,24],
['Kilkenny Golf Club', 52.671003, -7.244226,25],
['Gowran Park Golf Club', 52.619347, -7.0718617,26],
['Callan Golf Club', 52.533670, -7.372222,27],
['Castlecomer Golf Club', 52.797747, -7.206140,28],
['Bunclody Golf Club', 52.657151, -6.655118,29],
['St Helens Bay Golf Resort', 52.232270, -6.325706,30]
    
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: new google.maps.LatLng(xlatitude, xlongitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
	  
	  switch(locations[i][3]) {
		case 11:
		   marker = new google.maps.Marker({
				icon:"img/me.png",
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map
			  });
			break;
		case 1:
		   marker = new google.maps.Marker({
				icon:"img/golfclub10.png",
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map
			  });
			break;
		default:
			marker = new google.maps.Marker({
				icon:"img/golfclub.png",
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map
			  });
		}
	  


      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
	
	  }
);

	