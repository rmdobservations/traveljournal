#!/bin/bash
# GPWtoDecimal.sh
# This code should be run in the directory with photographs.
# The code reads the EXIFDATA from photographs and extracts the geolocation data 
# This data will be written to a GFX formatted file. 
# Created RMD 31-march-2017
# Modified RMD 6-november 207 

# Works on Linux.
# Requirements: exiftool installed.

infile=$1
if [ -z "$1" ]
  then
    echo "Usage:"
    echo "./GPSToDecimal.sh gpxfile"
    echo "File to be created"
  else
# Initialize Header information for gfx formatted files
# Change creator to own name
xml='<?xml version="1.0" '
encoding='encoding="UTF-8" '
echo $xml  $encoding
begingpx='<gpx version="1.1"'
creator='creator="RMD Observations" '
xmlns1='xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
xmlns2='xmlns="http://www.topografix.com/GPX/1/1"'
xsi='xsi:schemaLocation="http://www.topografix.com/GPX/1/1'
http='http://www.topografix.com/GPX/1/1/gpx.xsd">"'
endgpx='</gpx>'

# GFX waypoint format
#<wpt lat="52.70565" lon="4.69206">
#<name>name is</name><desc>description is</desc>
#</wpt>

echo $begingpx $creator $xmlns1 $xmnls2 $xsi $http  > $infile

wpt1='<wpt lat="'
wpt2='" lon="'
wpt3='">'

lname='<name>'
rname='</name>'
ldesc='<desc>'
rdesc='</desc>'
wpt4='</wpt>'

arrName=($(ls -1 *.jpg))
#remove space between date and time with sed
arrDate=($(exiftool -n -p '$GPSDateTime' *.jpg | sed -e 's/ /_/g'))
arrLat=($(exiftool -n -p  '$GPSLatitude' *.jpg ))
arrLon=($(exiftool -n -p  '$GPSLongitude' *.jpg ))
 
n=0
for t in "${arrName[@]}"
do
  echo $wpt1"${arrLat[$n]}"$wpt2"${arrLon[$n]}"$wpt3 >> $infile
  echo $lname"${arrName[$n]}"$rname >> $infile
  echo $ldesc"${arrDate[$n]}"$rdesc >> $infile
  echo $wpt4 >> $infile
 let n++
  
done
fi

echo $endgpx >> $infile 

