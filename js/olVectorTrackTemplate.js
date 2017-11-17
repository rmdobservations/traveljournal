function olVectorTrackTemplate(filename,projection,labelLayer,layerstyle) {

// layer style variables are defined in olStyleTemplate
// layerstyle is 'symbolstyle' for waypoints and 'trackstyle' for tracks
// use string search to determine if this is gpx or kml
console.log("Inside olVectorTrackTemplate: SHOULD be only one file  ",filename)
// Use string search to determine automatically the format of the track data
var gpxfile=filename.match('gpx');
var kmlfile=filename.match('kml');

	if (gpxfile[0] == 'gpx'){
		var trackformat =  new ol.format.GPX();
		} else if (kmlfile[0] == 'kml') {
			var trackformat =  new ol.format.KML();
	     	} else {
			alert("unrecognized track format");
			
		}

var tracksource =	new ol.source.Vector({
         projection: projection,
        	url: filename,
        	format: trackformat
        	});

trackdistance(filename,tracksource);

var vectorLayer = new ol.layer.Vector({
         title: labelLayer,
         source: tracksource,
    		style: function(feature) {
          return layerstyle[feature.getGeometry().getType()];
        		}
   
	    	});
	return vectorLayer;
	    }


