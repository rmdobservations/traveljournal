/* Initialize information for trip here:
- projection for map
-center of map 
-zoom
- KML or GPX
- files with points and display properties
- files with tracks and display properties
Created RMDobservations 12 november 2017
Modified: RMDobservations 15 november 2017 Removed gpx from variable names. 
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
	
	
	var waypointArray = ['gpx/waypoints/oct15.gpx','gpx/waypoints/oct16.gpx','gpx/waypoints/oct17.gpx'];
	var waypointObj = {
		'menutitle': 'Photo points',
		'filearray' : waypointArray,
		'symbolstyle': redstarStyle

		}
	return waypointObj;
	}
// tracks
function getTrackFileArray(){

	var trackArray =  ['gpx/tracks/oct15track.gpx','gpx/tracks/oct16track.gpx','gpx/tracks/oct17track.gpx'];
	var trackObj = {
		'menutitle': 'Bike Route',
		'filearray': trackArray,
		'trackstyle': trackStyle	
		}
	return trackObj;
	}


