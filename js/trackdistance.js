/*
trackdistance uses only one track at a time.
Need to distinguish between kml, gpx, or other formats

works on one track file
*/


function trackdistance(trackfile,source) {
 console.log("should be only one file here inside trackdistance " , trackfile);
 // Use string search to determine automatically the format of the track data
var gpxfile=trackfile.match('gpx');
var kmlfile=trackfile.match('kml');
	var promise = $.ajax({
	 	   url: trackfile,
         method: "GET"
     })
   
   promise.done(function(x) {
			  	
   if (gpxfile[0] == 'gpx'){

	// based on: https://github.com/mapbox/togeojson/issues/122
		var jsondata = toGeoJSON.gpx((new DOMParser()).parseFromString(x, 'text/xml'))
		console.log("GPX file: ",jsondata)
		} else if (kmlfile[0] == 'kml') {
			jsondata = toGeoJSON.kml(x);
	     	} else {
			alert("unrecognized track format");
			
		}
 			var a = new ol.format.GeoJSON();
        	var features = a.readFeatures(jsondata);
        	var street = features[0];
		   var turfLine = a.writeFeatureObject(street);
		   var totaldistance = turf.lineDistance(turfLine, 'kilometers');
		    var totalmiles = turf.lineDistance(turfLine, 'miles');
        	street.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        				
         source.addFeature(street);
			console.log("distance (km) (miles): ",totaldistance,totalmiles);
			$('#distance').append(totaldistance.toFixed(2)+" kilometers <br>");
       
  		}).
  		fail(function(xhr) {
		    console.log('error', xhr);
  			});
 
    }
    