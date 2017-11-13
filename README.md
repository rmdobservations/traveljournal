# traveljournal
Create a template travel journal website. Structure is pre-written. Additions from one's trip can be easily added as 
GPX or KML files.
What makes a good travel journal: Text, Photographs, Map, Menu 

Map software is Openlayers 3. Code is written so that one needs to fill in only a minimal amount of information
about their trip. These should be:
- location
- Name of gpx file
- number of gpx files (legs of a trip, one for each day)
- text

Requirements:
- exiftool for extracting geolocation from photographs (https://www.sno.phy.queensu.ca/~phil/exiftool/)
- jquery.js (https://jquery.com/)
- Openlayers (https://github.com/openlayers/openlayers)
- OL3 layer switcher (https://github.com/walkermatt/ol3-layerswitcher) for menu layers

Instructions: 
- Copy (or extract) tripTemplate and all subfolders to a folder with the name which describes your trip.
i.e. summer2017. 
- cd summer2017 
- edit map.html and replace title 
- cd summer2017/js and replace central coordinates of new map.
- cp gfx files to summer2017/gfx 

Instructions to create GFX file from EXIFdata on photographs
- cd to directory with list of fotos for part or all of trip
- 	GPStoDecimal.sh list.gfx
- pay attention to see if there are some undefined. This can be repaired manually (i.e. https://www.geoplaner.com/)

Directory structure:
In order to use common files 
-traveljournal
	icons/ i.e. tent
	js/ files used for all trips
		subroutines.js contains snippets
		olStyleTemplate.js Fills in all code that does NOT have to change for each  trip, ie default point style.
	css/ styling common to all trips
--triptemplate 
	js/ 
	css/
	gpx/
		waypoints - single geocoordinate per location
		routes - path connecting or beside waypoints, series of coordinate pairs