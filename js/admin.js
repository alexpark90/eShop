var cars = [];
var rateData = [];
var salesData = [];

$(document).on("pagebeforeshow", "#admin", function() {

	console.log("before show");
	$.ajax({
		type : "GET",
		url : "cars.json",
		dataType : "json",
		success : handleAdmin
	});
});




var handleAdmin = function(data) {

	console.log("in here");
	cars = data.cars;

	var rateTitle = "Average Rating";
	var salesTitle = "Car Sales";
	var colors = [ "#F44336", "#4CAF50", "#9C27B0", "#2196F3" ];
	var carLabels = [];

	// loop to set labels and data for graphs
	for(var i = 0; i < cars.length; i++)
	{
		// set names of cars as for labels
		carLabels[i] = cars[i].brand;

		// get values from local storage
		var rate = localStorage.getItem("eShop_car" + i + "_rate");
		var sales = localStorage.getItem("eShop_car" + i + "_sale");

		// assign 0 value if there is no data in local storage
		rate != 'undefined' ? rateData[i] = rate : rateData[i] = 0;
		salesData != 'undefined' ? salesData[i] = sales : salesData[i] = 0;
	}

	// draw a bar chart for ratings 
	var ratingChart = new Chart($("#ratingChart"), {
	    type: 'bar',
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

	// draw a donught chart for sales 
	var doughnutType = new Chart($("#salesChart"), {
	    type: 'doughnut',
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
};

$(document).on("click", "#showRating", function() {

		var tb = $("#ratingTable tbody");
		var newBody = "";
		// loop to add rows into a table
		for(var i = 0; i < cars.length; i++)
		{
			var row = "<tr>" + 
						"<td>" + cars[i].brand + "</td>" +
						"<td>" + cars[i].model + "</td>" +
						"<td>" + cars[i].color + "</td>" +
						"<td>" + cars[i].price + "</td>" +
						"<td>" + rateData[i] + "</td>" +
					"</tr>";
			newBody += row;
		}
		tb.empty().append(newBody);
        
        $("#ratingTable").trigger('create')
});

$(document).on("click", "#showSales", function() {

	// reset table before add rows
	$("#salesTable tbody").html("");

	// loop to add rows into a table
	for(var i = 0; i < cars.length; i++)
	{
		$("#salesTable tbody").append("<tr>" + 
											"<td>" + cars[i].brand + "</td>" +
											"<td>" + cars[i].model + "</td>" +
											"<td>" + cars[i].color + "</td>" +
											"<td>" + cars[i].price + "</td>" +
											"<td>" + salesData[i] + "</td>" +
										"</tr>"
										);
	}
});