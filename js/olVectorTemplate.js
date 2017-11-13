function olVectorTemplate(labelLayer,urlLayer,projection,layerstyle) {
	
// layer style variables are defined in olStyleTemplate


var vectorLayer = new ol.layer.Vector({
         title: labelLayer,
         source: new ol.source.Vector({
         	projection: projection,
        		url: urlLayer,
        		format: new ol.format.GPX()
        		}),
    		style: function(feature) {
          return layerstyle[feature.getGeometry().getType()];
        		}
   
	    	});
	return vectorLayer;
	    }


