/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: Aug. 05. 2016
 *	This is the javascript for admin page
 */

$(document).on("pagebeforeshow", "#admin", function() {

	$.ajax({
		type : "GET",
		url : "cars.json",
		dataType : "json",
		success : handleAdmin
	});
});

// page event for #admin
var handleAdmin = function(data) {

	if(!(window.localStorage))
	{
		alert("[Error] localStorage is not supported!");
		return;
	}

	// get cars array
	var cars = data.cars;

	// initialize variables to draw chart
	var salesTitle = "Car Sales";
	var rateTitle = "Average Rating";
	var colors = [ "#F44336", "#4CAF50", "#9C27B0", "#2196F3" ];
	var carLabels = [];
	var salesData = [];
	var rateData = [];


	// loop to set labels and data for charts
	for(var i = 0; i < cars.length; i++)
	{
		// set names of cars as for labels
		carLabels[i] = cars[i].brand;

		// get values from local storage
		var sales = localStorage.getItem("eShop_car" + i + "_sale");
		var rate = localStorage.getItem("eShop_car" + i + "_rate");

		// assign 0 value if there is no data in local storage
		sales != null ? salesData[i] = sales : salesData[i] = 0;
		rate != null ? rateData[i] = rate : rateData[i] = 0;
	}


	////////// draw a donught chart for sales 

	var doughnutChart = new Chart($("#salesChart"), {
	    type: 'doughnut',
	    animation: true,
	    data: {
	    	labels: carLabels,
	    	datasets: [{
	    		data: salesData,
	    		backgroundColor: colors,
	    	}]
	    },
	    options: {
	    	title: {
	    		display: true,
	    		position: 'top',
	    		text: salesTitle
	    	},
	    	legend: {
	            display: true,
	            position: 'bottom'
	        },
	        animation: {
	        	duration: 2000
	        }
	    }
	});

	///////// draw a bar chart for ratings 
	
	var barChart = new Chart($("#ratingChart"), {
	    type: 'bar',
	    animation: true,
	    data: {
	        labels: carLabels,
	        datasets: [{
	            data: rateData,
	            backgroundColor: colors
	        }]
	    },
	    options: {
	    	title: {
	    		display: true,
	    		position: 'top',
	    		text: rateTitle
	    	},
	    	legend: {
	            display: false,
	        },
	    	scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        },
	        animation: {
	        	duration: 2000
	        }
	    }
	});

	////////////// create sales table

	var salesBody = "";

	// loop to add rows into a table
	for(var i = 0; i < cars.length; i++)
	{
		var row = "<tr>" + 
					"<td>" + cars[i].brand + "</td>" +
					"<td>" + cars[i].model + "</td>" +
					"<td>" + cars[i].color + "</td>" +
					"<td>" + "$ " + formatCurrency(cars[i].price) + "</td>" +
					"<td>" + salesData[i] + "</td>" +
				"</tr>";
		salesBody += row;
	}
	$("#salesTable tbody").empty().append(salesBody);
    
    $("#salesTable").trigger("create");


    ////////////// create rating table

	var ratingBody = "";

	// loop to add rows into a table
	for(var i = 0; i < cars.length; i++)
	{
		var row = "<tr>" + 
					"<td>" + cars[i].brand + "</td>" +
					"<td>" + cars[i].model + "</td>" +
					"<td>" + cars[i].color + "</td>" +
					"<td>" + "$ " + formatCurrency(cars[i].price) + "</td>" +
					"<td>" + rateData[i] + "</td>" +
				"</tr>";
		ratingBody += row;
	}
	$("#ratingTable tbody").empty().append(ratingBody);
    
    $("#ratingTable").trigger("create");
};


///////////////////////////////////////////////////////////////////////
/////////////////////////// events ////////////////////////////////////


// add a click event to show sales table
$(document).on("click", "#showSales", function() {

	if($("#showSales").html() == "Show Sales Table")
	{
		$("#salesTable").fadeIn("slow");
		$("#showSales").html("Hide Sales Table");
	}
	else
	{
		$("#salesTable").fadeOut("slow");
		$("#showSales").html("Show Sales Table");	
	}
});

// add a click event to show rating table
$(document).on("click", "#showRating", function() {

	if($("#showRating").html() == "Show Rating Table")
	{
		$("#ratingTable").fadeIn("slow");
		$("#showRating").html("Hide Rating Table");
	}
	else
	{
		$("#ratingTable").fadeOut("slow");
		$("#showRating").html("Show Rating Table");	
	}
});

// function to format price
// it take an number as a parameter
var formatCurrency = function(price) {

	var origPrice = parseInt(price);
	var formatted = origPrice.toLocaleString("en");
	return formatted;
};