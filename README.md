# MMM-SimpleNotifyRadio
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). This Module based on the [MMM-Myvoiceradio Repository](https://github.com/gismo2006/MMM-Myvoiceradio) by [gismo2006](https://github.com/gismo2006). This Version of the WebRadio Player is controlled by
notifications. For Example I use my other module [MMM-SimpleButtons](https://github.com/freequenzart/MMM-SimpleButtons)<br><br>
In the moment this module is only an early version and the small helping Texts appears only in german. You can change them in the <code>getDom</code> function.
## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/freequenzart/MMM-SimpleNotifyRadio.git`. A new folder will appear navigate into it.
2. in the stations folder you will find some example stations from germany

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
					stationFile: "bigfm",
					stationName: "bigFM"
				},
				{
					stationFile: "psr",
					stationName: "Radio PSR"
				},
				{
					stationFile: "jump",
					stationName: "MDR JUMP"
				},
				{
					stationFile: "mdr_sachsen",
					stationName: "MDR Sachsen"
				},
				{
					stationFile: "rtl_sachsen",
					stationName: "Hitradio RTL"
				},
				{
					stationFile: "sunshine",
					stationName: "Sunshine Live"
				},
				{
					stationFile: "1live",
					stationName: "1Live"
				},
				{
					stationFile: "clubsandwich",
					stationName: "Flux Clubsandwich"
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
			<td>an array of objects with 2 keys:<br>
				<b>stationFile</b> is the name of the script file in the station folder<br>
				<b>stationName</b> is the Text which is displayed when the Channel is choosen<br>
				<br>
				<pre>
<code>stations: [
	{
		stationFile: "bigfm",
		stationName: "bigFM"
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
2. the scripts in the station folder should be executeable  <code>chmod +x FILENAME</code>
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
