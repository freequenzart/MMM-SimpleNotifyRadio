#!/bin/bash
station="$1"
playlist=$2
modify=""

killall mpg123
sleep 0.1
if [[ "$playlist" = "1" ]]
then
    modify="-@"
fi
eval "mpg123 $modify $station"