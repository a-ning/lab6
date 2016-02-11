'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	/* slide 41 */
	var url = "/project/" + idNumber;
	$.get(url, callbackProj);
	console.log("calling url " + url);
}

/* slide 41 */
function callbackProj (result) {
	console.log(result);

	/* slide 43-44 */
	var projID = "project" + $(result).attr('id');
	var projImg = $(result).attr('image');
	var projTitle = $(result).attr('title');
	var projDate = $(result).attr('date');
	var projSumm = $(result).attr('summary');

	var htmlString = '<img src=' + projImg + ' class="detailsImage">' + 
	'<h3>' + projTitle + '</h3>' + 
	'<h4>' + projDate + '</h4>' + 
	'<p>' + projSumm + '</p>';

	$('#' + projID + ' .details').html(htmlString);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	/* slide 47 */
	$.get("/palette", callbackColor);
}

function callbackColor (result) {
	var colors = $(result).attr('colors');
	var hexVals = $(colors).attr('hex');
	//console.log(hexVals);

	$('body').css('background-color', hexVals[0]);
	$('.thumbnail').css('background-color', hexVals[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', hexVals[2]);
	$('p').css('color', hexVals[3]);
	$('.project img').css('opacity', .75);
}