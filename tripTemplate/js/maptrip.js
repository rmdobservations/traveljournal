/*
maptrip.js
Goal is to create a map without needing to edit anything in this folder. All specifics are to be entered
in the javascipt file initialize.js

Created RMD 6 november 2017
Modified:RMD 6 november 2017 Put common code snippets into separate modules
			RMD 10 november 2017 Created some functions for initializing map and layers
			RMD 10 november 2017 
*/


$(document).ready(function() {

var mapProjection= getProjection();


/* fetch center lon and lat of map */

var center_route= getMapCenter(mapProjection);
var zoom = getZoom();
/* Prepare Tile Layers for Map */
var osm = new ol.layer.Tile({
			title:"OSM", /* this appears in layer switcher */
      	type: "base",
      	source: new ol.source.OSM()
			});
      	
var tileLayerGroup = new ol.layer.Group({
      	title: 'Base Layer',
        	layers: [osm]
        	})    

/* Prepare Group for overlay layers */  

var overlayGroup = new ol.layer.Group({
        title: 'Overlays',
        layers: []
			});
	
var mapGroup =  [tileLayerGroup,overlayGroup ]

var map = new ol.Map({
	controls: ol.control.defaults({
          attributionOptions: ({
            collapsible: false
	          })
        }),
	layers: mapGroup,
   target: document.getElementById('map'),
   view: new ol.View({
			center: center_route,
   	   zoom: zoom
        	})
      });




var layerSwitcher = new ol.control.LayerSwitcher({
       tipLabel: 'Légende' // Optional label for button
   	 });
 	   
map.addControl(layerSwitcher);
// additional layers 

/* Fetch waypoints  */

var waypointObj = getWaypointFileArray(mapProjection);
console.log('waypoint style: ',)
console.log("Check array of filenames: ",waypointObj['filearray'])
var waypoints = waypointObj['filearray'];

var waypointLayerArray=[];

for (var i=0;i< waypoints.length;i++)
{
	filename = "gpx/waypoints/" + waypoints[i];
	waypointLayerArray.push(olVectorTemplate(waypoints[i],filename,mapProjection,waypointObj['symbolstyle']));
}


// use reverse to have first data at top of menu 
var waypointLayer = new ol.layer.Group({
			title: waypointObj['menutitle'],
         layers: waypointLayerArray.reverse()
         })       
            
/* Fetch tracks  */

var trackObj = getTrackFileArray(mapProjection);
console.log("Check array of filenames: ",tracks);

var tracks = trackObj['filearray'];
var tracksLayerArray=[];

for (var i=0;i< tracks.length;i++)
{
	filename = "gpx/tracks/" + tracks[i];
	tracksLayerArray.push(olVectorTemplate(tracks[i],filename,mapProjection,trackObj['trackstyle']));
}

  var trackLayer = new ol.layer.Group({
			title: trackObj['menutitle'],
         layers: tracksLayerArray.reverse()
         })       

overlayGroup.getLayers().push(trackLayer);
overlayGroup.getLayers().push(waypointLayer);
});

