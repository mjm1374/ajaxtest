

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


    

    function setMarkers(thisLocal, copy) {
        var marker = new google.maps.Marker({
            record_id: thisLocal.placeId,
            position: {
                lat: parseFloat(thisLocal.location.position[0]),
                lng: parseFloat(thisLocal.location.position[1])
            },
            map: map,
            icon: thisLocal.icon,
            title: thisLocal.title
        });
   
        var infowindow = new google.maps.InfoWindow({
            content: copy
        });
    
        google.maps.event.addListener(marker, 'click', function () {
            if (infowindow) {
                infowindow.close();
            }
            infowindow.open(map, marker);
        });

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
