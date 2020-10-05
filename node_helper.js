'use strict';

const NodeHelper = require('node_helper');
const exec       = require('child_process').exec;
const execSync  = require('child_process').execSync;

module.exports = NodeHelper.create({

	start: function() {
		console.log('init Radio');
	},

	oldVolume: 0,
	volumeOffset: 5,

	getVolume() {
		const self = this;
		const stdOut = execSync('sudo /home/pi/MagicMirror/modules/MMM-SimpleNotifyRadio/controls/volume_get.sh', 
			{ encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }
		);
		self.oldVolume = parseInt(stdOut.replace('%', ''), 10);
		return self.oldVolume;
	},

	setVolume(value, assign) {
		const self = this;
		if(value > 100 || value < 0) {
			return;
		}
		exec('sudo /home/pi/MagicMirror/modules/MMM-SimpleNotifyRadio/controls/volume_set.sh ' + value, null);
		if(assign) {
			self.oldVolume = value;
		}
	},
 
  	socketNotificationReceived: function(notification, payload) {
		const self = this;
		let currentValue = 0;
		switch (notification) {
			case 'SWITCH_RADIO_STATION':
				let name = '';
				if(payload.paused) {
					console.log('stop Radio');
					exec('sudo /home/pi/MagicMirror/modules/MMM-SimpleNotifyRadio/controls/stop.sh', null);
				}
				else {
					name = payload.stations[payload.currentIndex].stationName;
					console.log('start ' + name);
				}

				if(name != '') {
					const url = payload.stations[payload.currentIndex].stationURL;
					const playlist = payload.stations[payload.currentIndex].isPlaylist ? ' 1' : '';
					exec('sudo /home/pi/MagicMirror/modules/MMM-SimpleNotifyRadio/controls/station.sh ' + url + playlist, null);
				}
				break;
			
			case 'VOLUME_UP':
				currentValue = self.getVolume();
				self.setVolume((currentValue + self.volumeOffset), true);
				self.sendSocketNotification('VOLUME_CHANGED', {
					volume: self.oldVolume
				});
				break;

			case 'VOLUME_DOWN':
				currentValue = self.getVolume();
				self.setVolume((currentValue - self.volumeOffset), true);
				self.sendSocketNotification('VOLUME_CHANGED', {
					volume: self.oldVolume
				});
				break;

			case 'VOLUME_MUTE':
				currentValue = self.getVolume();
				self.setVolume(0, false);
				self.sendSocketNotification('VOLUME_CHANGED', {
					volume: 0
				});
				break;

			case 'VOLUME_UNMUTE':
				self.setVolume(self.oldVolume, true);
				self.sendSocketNotification('VOLUME_CHANGED', {
					volume: self.oldVolume
				});
				break;
		}
   	},
  
});

	