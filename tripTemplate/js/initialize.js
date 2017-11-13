/* Initialize information for trip here:
- projection for map
-center of map 
-zoom
- files with points and display properties
- files with tracks and display properties

*/
function getProjection(){
	return 'EPSG:4326';
}

// map center
function getMapCenter(proj){
	var    center_lon=4.9707
	var    center_lat= 52.1606
	var center_route= ol.proj.transform([center_lon,center_lat],  proj, 'EPSG:3857'  );
	console.log("center route: ",center_route);
	return center_route;
	}
//  map zoom
function getZoom(){
	return 12;	
	};
// waypoints

function getWaypointFileArray(){
	
	
	var gpxArray = ['oct15.gpx','oct16.gpx','oct17.gpx'];
	var waypointObj = {
		'menutitle': 'Photo points',
		'filearray' : gpxArray,
		'symbolstyle': redstarStyle

		}
	return waypointObj;
	}
// tracks
function getTrackFileArray(){

	var gpxArray = ['triptrackD.gpx','triptrackE.gpx'];
	var trackObj = {
		'menutitle': 'Bike Route',
		'filearray': gpxArray,
		'trackstyle': trackStyle	
		}
	return trackObj;
	}


