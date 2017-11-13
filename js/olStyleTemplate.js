/* Predefined point an d line properties for layer properties 
	These variables should be entered in the initialize.js file
	Created: 10 november 2017 RMD
*/

 var iconStyle = {
 	'Point': new ol.style.Style({
 	image: new ol.style.Icon({
		anchor: [0.5, 0.5],
  size: [32, 32],
  offset: [0, 0],
  opacity: 1,
  src: '../icons/rmdtent.png'
        })
          })
       }
 
var redstarStyle = {
 	'Point': new ol.style.Style({
 	image: new ol.style.Icon({
		anchor: [0.5, 0.5],
  size: [32, 32],
  offset: [0, 0],
  opacity: 1,
  src: '../icons/redstar.png'
        })
          })
 }

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