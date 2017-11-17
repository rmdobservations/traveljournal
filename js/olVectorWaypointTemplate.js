function olVectorWaypointTemplate(filename,projection,labelLayer,layerstyle) {
	
//	labelLayer,urlLayer,projection,layerstyle) 
	// based on old setVectorProperties.js
// layer style variables are defined in olStyleTemplate
// layerstyle is 'symbolstyle' for waypoints and 'trackstyle' for tracks
// use string search to determine if this is gpx or kml

//console.log(filename);
var gpxfile=filename.match('gpx');
var kmlfile=filename.match('kml');
/* console.log("In olVector Track Template");
console.log("gpx object: ",gpxfile);
console.log("kml object: ",kmlfile);
*/
if (gpxfile[0] == 'gpx')
{
	var waypointformat =  new ol.format.GPX();
	
} else if (kmlfile[0] == 'kml'){
	var waypointformat =  new ol.format.KML();

} else {
console.log("unrecognized track format");
return 0;
}





var vectorLayer = new ol.layer.Vector({
         title: labelLayer,
         source: new ol.source.Vector({
         	projection: projection,
        		url: filename,
        		format: waypointformat
        		}),
    		style: function(feature) {
          return layerstyle[feature.getGeometry().getType()];
        		}
   
	    	});
	return vectorLayer;
	    }


