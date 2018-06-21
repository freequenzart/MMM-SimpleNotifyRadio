/* global Module */

/* Magic Mirror
 * Module: Based On MMM-Myvoiceradio
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("MMM-SimpleNotifyRadio",{


	defaults: { 
		stations: [],
		currentIndex: 0,
		paused: true
	},

	hidden: false,

	hideModule: function() {
		this.notificationReceived("STOP_RADIO", { })
		this.hidden = true;
		this.hide();
	},

	showModule: function() {
		this.hidden = false;
		this.show();
	},

	start: function() {
		var self = this;/*
		self.notificationReceived("START_RADIO", { });
		setTimeout(function() { self.notificationReceived("SWITCH_NEXT_RADIO_STATION", { }) }, 10000);
		setTimeout(function() { self.notificationReceived("SWITCH_NEXT_RADIO_STATION", { }) }, 20000);
		setTimeout(function() { self.notificationReceived("STOP_RADIO", { }) }, 20000);*/
	},

	notificationReceived: function(notification, payload, sender) {
		var self = this;
		
		if (notification === "HIDE_RADIO") {
			self.hideModule();
		}
		
		if (notification === "SHOW_RADIO") {
			self.showModule();
		}

		if(self.hidden)
			return;

		var stations = self.config.stations;
		if (notification === "START_RADIO" && stations.length > 0) {
			self.config.paused = false;
	        	self.sendSocketNotification("SWITCH_RADIO_STATION", self.config);
			self.updateDom();
		}
		if (notification === "SWITCH_PREV_RADIO_STATION" && stations.length > 0) {
			self.config.paused = false;
			self.config.currentIndex = self.config.currentIndex - 1;
			if(self.config.currentIndex < 0) {
				self.config.currentIndex = stations.length - 1;
			}
	        	self.sendSocketNotification("SWITCH_RADIO_STATION", self.config);
			self.updateDom();
		}
		if (notification === "SWITCH_NEXT_RADIO_STATION" && stations.length > 0) {
			self.config.paused = false;
			self.config.currentIndex = (self.config.currentIndex + 1) % stations.length;
	        	self.sendSocketNotification("SWITCH_RADIO_STATION", self.config);
			self.updateDom();
		}
		if (notification === "STOP_RADIO" && stations.length > 0) {
			self.config.paused = true;
	        	self.sendSocketNotification("SWITCH_RADIO_STATION", self.config);
			self.updateDom();
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper      = document.createElement("div");
		var radioTopic   = document.createElement("div");
		var radioWrapper = document.createElement("div");

		radioTopic.className   = "small dimmed";
		radioTopic.innerHTML   = 'Online Radio';
		radioWrapper.className = "medium";

		if(this.config.stations.length === 0) {
			radioWrapper.innerHTML = "<i class='fa fa-exclamation-circle'> keine Stationen";
		}
		else if(this.config.paused) {
			radioWrapper.innerHTML = "<i class='fa fa-stop-circle-o'> Radio aus";
		}
		else {
			radioWrapper.innerHTML = "<i class='fa fa-rss'> " + this.config.stations[this.config.currentIndex].stationName;
		}

		wrapper.appendChild(radioTopic);
		wrapper.appendChild(radioWrapper);
		return wrapper;
	}
});
