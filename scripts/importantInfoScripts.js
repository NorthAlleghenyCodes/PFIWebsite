/*
Name: Akshath Jain
Date: 4/12/18
Purpose: scripts to future proof the PFI websites - i.e. create script to automatically update the new dates on a yearly basis
*/

$(document).ready(function(){
	$.getJSON("https://pghforensics.org/json/importantInfo.json", function(data){
		
		//get hash (e.g. pghforensics/#2017)
		var hash = window.location.hash.substring(1);
		var yearData;
		if(hash !== ""){
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year == hash)
					yearData = data[i];
			}
			if(yearData == undefined)
				yearData = data[data.length - 1];
		}else
			yearData = data[data.length - 1]; //get data for current year

		//assign signup link to button
		document.getElementById("signup-button").href = yearData.signup;

		//assign dates and times
		var whenString = "Sessions will be held Monday to Friday from " + yearData.startTime + " - " + yearData.endTime + " starting on " + yearData.startDate + " and ending on " + yearData.endDate + ".";
		document.getElementById("when-description").innerHTML = whenString;

		//assign location to link and map
		var whereString = "All lessons will be held at " + yearData.addressName;
		document.getElementById("where-description").innerHTML = whereString;
		document.getElementById("where-address").innerHTML = yearData.address;
		document.getElementById("map-iframe").src = yearData.googleMapsLink;

	});
});