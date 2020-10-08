# MMM-SimpleNotifyRadio
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). This Module based on the [MMM-Myvoiceradio Repository](https://github.com/gismo2006/MMM-Myvoiceradio) by [gismo2006](https://github.com/gismo2006). This Version of the WebRadio Player is controlled by
notifications. For Example I use my other module [MMM-SimpleButtons](https://github.com/freequenzart/MMM-SimpleButtons)<br><br>
In the moment this module is only an early version and the small helping Texts appears only in german. You can change them in the <code>getDom</code> function.
## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/freequenzart/MMM-SimpleNotifyRadio.git`. A new folder will appear navigate into it.
2. in the controls dir all files have to be executeable
3. the older version had .sh files in a station dir. this is no longer needed

### Sound on new Raspbian OS
Raspbian OS changed the way the sound works in the newest buster versions. So the volume*.sh files won't work anymore. `amixer -q -M  sset PCM $value` show the error that "PCM" wasn't find. So I head to changed it to `amixer -q -M  sset Headphone $value` because I configured the sound in the following way:
1. look up the existing sound boards: `cat /proc/asound/cards`:
````javascript
 0 [b1             ]: bcm2835_hdmi - bcm2835 HDMI 1
                      bcm2835 HDMI 1
 1 [Headphones     ]: bcm2835_headphonbcm2835 Headphones - bcm2835 Headphones
                      bcm2835 Headphones
````

2. I choose headphone for the analog output and created / edited `sudo nano /etc/asound.conf`:
````javascript
   defaults.pcm.card 1
   defaults.ctl.card 1
````

3. next I changed the existing file `nano ~/.asoundrc` to the same and deleted the other content:
````javascript
   defaults.pcm.card 1
   defaults.ctl.card 1
````

Now the volume and sound in the bash was working again.

## Notifications
1. `HIDE_RADIO` hide radio module
2. `SHOW_RADIO` show radio module
3. `START_RADIO` start webradio
4. `STOP_RADIO` stop webradio
5. `SWITCH_PREV_RADIO_STATION` switches to the prev station
6. `SWITCH_NEXT_RADIO_STATION` switches to the next station
7. `SWITCH_RADIO_STATION` internal command
8. `VOLUME_UP` highter the volume of pi
9. `VOLUME_DOWN` lower the volume of pi
10. `VOLUME_MUTE` mute the pi
11. `VOLUME_UNMUTE` unmute the pi
12. `VOLUME_CHANGED` internal command
13. `MODULE_STATUS_CHANGED` for reporting to external modules

## Using the module
To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
		{
		module: 'MMM-SimpleNotifyRadio',
		position: 'bottom_right',
		config: {
			stations: [
				{
					stationURL: "http://streams.bigfm.de/bigfm-deutschland-128-mp3?usid=0-0-H-M-D-01",
					stationName: "bigFM"
				},
				{
					stationURL: "http://psr.hoerradar.de/psr-live-mp3-hq",
					stationName: "Radio PSR"
				},
				{
					stationURL: "http://avw.mdr.de/streams/284320-0_mp3_high.m3u",
					stationName: "MDR JUMP",
					isPlaylist: true
				},
				{
					stationURL: "http://avw.mdr.de/streams/284280-0_mp3_high.m3u",
					stationName: "MDR Sachsen",
					isPlaylist: true
				},
				{
					stationURL: "http://hermes.bcs-systems.de/hitradio-rtl_simulcast__dresden_192k_mp3",
					stationName: "Hitradio RTL"
				},
				{
					stationURL: "http://sunshinelive.hoerradar.de/sunshinelive-live-mp3-hq",
					stationName: "Sunshine Live"
				},
				{
					stationURL: "http://wdr-1live-live.cast.addradio.de/wdr/1live/live/mp3/128/stream.mp3",
					stationName: "1Live"
				},
				{
					stationURL: "http://fluxfm.hoerradar.de/flux-clubsandwich-mp3-mq",
					stationName: "Flux Clubsandwich"
				},
				{
					stationURL: "http://topradio-stream20.radiohost.de/kissfm_mp3-192",
					stationName: "Kiss FM"
				}
			]
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>stations</code></td>
			<td>an array of objects with 2 / 3 keys:<br>
				<b>stationURL</b> url to webstream<br>
				<b>stationName</b> is the Text which is displayed when the Channel is choosen<br>
				<b>isPlaylist</b> is a boolean to ad the -@ parameter to the mpg123 bash command for playlists<br>
				<br>
				<pre>
<code>stations: [
	{
		stationFile: "http://streams.bigfm.de/bigfm-deutschland-128-mp3?usid=0-0-H-M-D-01",
		stationName: "bigFM",
		isPlaylist: false // *.m3u or *.pls would be true
	},
...</code>
				</pre>
			</td>
		</tr>
		<tr>
			<td><code>position</code></td>
			<td>where do you want to display the module</td>
		</tr>
	</tbody>
</table>

## Developer Notes
1. mpg123 should be installed on your device <code>sudo apt-get install mpg123</code>
2. all scripts in the conrols folder should be executeable  <code>chmod +x FILENAME</code>
3. mpg123 can only play http Streams! I can't get https running
3. Thank you [gismo2006](https://github.com/gismo2006) for the basic idea and code of [MMM-Myvoiceradio Repository](https://github.com/gismo2006/MMM-Myvoiceradio)!

## Dependencies
- mpg123 should be installed on your device <code>sudo apt-get install mpg123</code>

The MIT License (MIT)
=====================

Copyright © 2018 freequenzart

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
