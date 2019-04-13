

function initMap(newLat, newLng) {
    //console.log('map ' + newLat + "/" + newLng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: parseFloat(newLat),
            lng: parseFloat(newLng)
        },
        defaultView: 'streetmap',
        zoom: 14
    });


    map.addListener('dragend', function () {
        //    
        newCenter = map.getCenter();
        at = newCenter.lat() + "," + newCenter.lng();;
        getplaces();
        //    console.log("xxx: " + newCenter.lat());
        //
        //
    });

}


    function getLocation() {
        if (navigator.geolocation) {
         
            navigator.geolocation.getCurrentPosition(showPosition,showError);  
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
            //console.log("in getloc");
            //defaultLocal = setLocation();
            //console.log(defaultLocal.setLat);
        }
    } 


        
    function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
             findSatAbove();
            break;
          case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
          case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
        }
      } 
          
    function showPosition(position) {
        currentLat = position.coords.latitude;
        currentLng = position.coords.longitude;
        currentAlt = position.coords.altitude;
        if(currentAlt != null){currentAlt = currentAlt.toFixed(6);}
        console.log(currentLat, currentLng, currentAlt);
        //x.innerHTML =  "Your current coordinates: <br />Lat: " + currentLat.toFixed(6) + "<br/>Lng: " + currentLng.toFixed(6) + "<br/>Alt: " + currentAlt;
        
        //sLat.value = position.coords.latitude;
        //sLng.value = position.coords.longitude;
        initMap(currentLat ,currentLng ); // init gmap
        //sButton.disabled = false;
        loop = false;
        //findSatAbove();
        at = currentLat + "," + currentLng;
        
        return new setLocation(currentLat,currentLng,currentAlt);
        
    }


    

    function setMarkers(thisLocal) {

        //console.log("v: "  + thisLocal.satid); 
        var marker = new google.maps.Marker({
            record_id: thisLocal.id,
            position: {
                lat: parseFloat(thisLocal.position[0]),
                lng: parseFloat(thisLocal.position[1])
            },
            map: map,
            //icon: './img/icons8-satellite-50.png',
            title: thisLocal.title
    
        });
    
         infocontent = "<b>" + thisLocal.title + "</b><br />" ;
         infocontent += "<span class='addr'>" + thisLocal.vicinity + "</span><br />";
         if( thisLocal.openingHours != undefined){
            infocontent += "<span class='title'>Hours:</span><br /><span class='addr'>" + thisLocal.openingHours.text + "</span>";
         }
    
        var infowindow = new google.maps.InfoWindow({
            content: infocontent
        });
    
        google.maps.event.addListener(marker, 'click', function () {
            if (infowindow) {
                infowindow.close();
            }
            infowindow.open(map, marker);
        });
    
        console.log("setMarkers: " + thisLocal.title);
        markers.push(marker);
        map.panTo(marker.getPosition());
    
    
    }

    function DeleteMarkers() {
        //Loop through all the markers and remove
        console.log(markers.length);
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    };
