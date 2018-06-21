'use strict';

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({

	start: function() {
		console.log("init Radio");
	}, 
 
  	socketNotificationReceived: function(notification, payload) {
		if (notification === "SWITCH_RADIO_STATION") {
			var name = "";
			if(payload.paused) {
				console.log("stop Radio");
				name = "stop";
			}
			else {
				name = payload.stations[payload.currentIndex].stationFile;
				console.log("start " + name);
			}

			if(name != "") {
				exec("sudo /home/pi/MagicMirror/modules/MMM-SimpleNotifyRadio/stations/" + name + ".sh", null);
			}
		}
   	},
  
});

	