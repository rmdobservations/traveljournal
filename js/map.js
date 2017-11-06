$(document).ready(function() {
// add mouse position
 var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
      });
      // style icon

 /*var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([0, 0])
      });*/

 var iconStyle = {
 	'Point': new ol.style.Style({
 	image: new ol.style.Icon({
		anchor: [0.5, 0.5],
  size: [32, 32],
  offset: [0, 0],
  opacity: 1,
  src: 'images/rmdtent.png'
        })
          })
       }
 var AHstyle = {
 	'Point': new ol.style.Style({
 	image: new ol.style.Icon({
		anchor: [0.5, 0.5],
  size: [32, 32],
  offset: [0, 0],
  opacity: 1,
  src: 'images/logo-ah.png'
        })
          })
       }
       var dotStyle = {
 	'Point': new ol.style.Style({
 	image: new ol.style.Icon({
		anchor: [0.5, 0.5],
  size: [32, 32],
  offset: [0, 0],
  opacity: 1,
  src: 'images/redstar.png'
        })
          })
       }
      //iconFeature.setStyle(iconStyle);
var earthquakeStyle = new ol.style.Style({
  image: new ol.style.Icon({
  anchor: [0.5, 0.5],
  size: [52, 52],
  offset: [52, 0],
  opacity: 1,
  scale: 0.25,
  src: '../../assets/img/dots.png'
  })
  });
// style gpx
	
	 var trackStyle = {
        'Point': new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(255,0,0,1)'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: '#ff0',
              width: 1
            })
          })
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 4
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0f0',
            width: 3
          })
        })
      };
	
gpxFile = ['LFroute_LoosdrechtWilnes/fietsersbond-trackplanner.gpx','waypoints/waypoints.gpx','waypoints/waypoints_ah.gpx','waypoints/oct15.gpx','waypoints/oct16.gpx']
	
var overlayGroup = new ol.layer.Group({
        title: 'Overlays',
        layers: []
			});
	
	
var osm = new ol.layer.Tile({
			title:"osm", /* this appears in layer switcher */
      	type: "base",
      	source: new ol.source.OSM()
			});
      	
var tileLayer = new ol.layer.Group({
      	title: 'Base Layer',
        	layers: [osm]
        	})    

   
	
var    center_lon=4.9707
var    center_lat= 52.1606
center_route= ol.proj.transform([center_lon,center_lat],  'EPSG:4326', 'EPSG:3857'  );
        console.log("center route: ",center_route);

var map = new ol.Map({
	controls: ol.control.defaults({
          attributionOptions: ({
            collapsible: false
	          })
        }).extend([mousePositionControl]),
	layers: [tileLayer,overlayGroup ],
   target: document.getElementById('map'),
   view: new ol.View({
			center: center_route,
   	   zoom: 12
        	})
      });




var layerSwitcher = new ol.control.LayerSwitcher({
       tipLabel: 'Légende' // Optional label for button
   	 });
 	   
map.addControl(layerSwitcher);

var vector1 = new ol.layer.Vector({
         title: 'LF route Loosdrecht to Wilnis',
         source: new ol.source.Vector({
        			projection: 'EPSG:3857',
        			url: gpxFile[0],
        			format: new ol.format.GPX()
        		}),
    style: function(feature) {
          return trackStyle[feature.getGeometry().getType()];
        }
   
	    	});

var vector2 = new ol.layer.Vector({
         title: 'Campgrounds',
         source:  new ol.source.Vector({
         projection: 'EPSG:3857',
        			url: gpxFile[0],
        			format: new ol.format.GPX()}),
           style: function(feature) {
          return iconStyle[feature.getGeometry().getType()];
        }
  
	    	}); 
	    	var vector3 = new ol.layer.Vector({
         title: 'AH',
         source: new ol.source.Vector({
        			projection: 'EPSG:3857',
        			url: gpxFile[2],
        			format: new ol.format.GPX()
        		}),
    style: function(feature) {
          return AHstyle[feature.getGeometry().getType()];
        }
	    	});
	    		var vector4 = new ol.layer.Vector({
         title: 'POIs',
         source: new ol.source.Vector({
        			projection: 'EPSG:3857',
        			url: gpxFile[3],
        			format: new ol.format.GPX()
        		}),
    style: function(feature) {
          return dotStyle[feature.getGeometry().getType()];
        }
	    	});
	    		var vector5 = new ol.layer.Vector({
         title: 'POIs',
         source: new ol.source.Vector({
        			projection: 'EPSG:3857',
        			url: gpxFile[4],
        			format: new ol.format.GPX()
        		}),
    style: function(feature) {
          return dotStyle[feature.getGeometry().getType()];
        }
	    	});
	    	/*
	    	var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'https://openlayers.org/en/v4.2.0/examples/data/gpx/fells_loop.gpx',
          format: new ol.format.GPX()
        }),
        style: function(feature) {
          return style[feature.getGeometry().getType()];
        }
      });
      */
var vectorLayer = new ol.layer.Group({
			title: 'Vector Layer',
         layers: [vector1,vector3,vector4,vector5]
         })       
            
overlayGroup.getLayers().push(vectorLayer);
var tentLayer = new ol.layer.Group({
			title: 'Tent Layer',
         layers: [vector2]
         })       
            
overlayGroup.getLayers().push(tentLayer);
});



function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);
    if (direction == "S" || direction == "W") { dd = dd * -1; }
    return dd;
}

function ParseDMS(input) {
    var parts = input.split(/[^\d\w]+/);
    var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    return [lat, lng];
}
