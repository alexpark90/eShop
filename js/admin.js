
// global variables
var cars = [];
var salesData = [];
var rateData = [];

$(document).on("pageshow", "#admin", function() {

	$.ajax({
		type : "GET",
		url : "cars.json",
		dataType : "json",
		success : handleAdmin
	});
});

// page event for #admin
var handleAdmin = function(data) {

	// get cars array
	cars = data.cars;

	var salesTitle = "Car Sales";
	var rateTitle = "Average Rating";
	var colors = [ "#F44336", "#4CAF50", "#9C27B0", "#2196F3" ];
	var carLabels = [];

	// loop to set labels and data for graphs
	for(var i = 0; i < cars.length; i++)
	{
		// set names of cars as for labels
		carLabels[i] = cars[i].brand;

		// get values from local storage
		var sales = localStorage.getItem("eShop_car" + i + "_sale");
		var rate = localStorage.getItem("eShop_car" + i + "_rate");

		// assign 0 value if there is no data in local storage
		salesData != 'undefined' ? salesData[i] = sales : salesData[i] = 0;
		rate != 'undefined' ? rateData[i] = rate : rateData[i] = 0;
	}


	// draw a donught chart for sales 
	var doughnutType = new Chart($("#salesChart"), {
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

	// draw a bar chart for ratings 
	var ratingChart = new Chart($("#ratingChart"), {
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

	$(document).on('click', '#test-btn', function(){       
        var tb = $('#tbProp');
        newRow = '<tr><td style="text-align: center;vertical-align:middle">' + 'Test11' + '</td> <td style="text-align: center;vertical-align:middle">' + '23.3'+ '</td><td style="text-align: center;vertical-align:middle"><a href="#" data-role="button" data-mini="true">Test22</a></td><td style="text-align: center;vertical-align:middle"><a href="#popupLogin" data-rel="popup" data-position-to="window" data-role="button" data-mini="true">Test33</a></td></tr>',
        newBody = "";
        for (var i = 0,
             l = 6; i < l; i += 1) {
            newBody += newRow;
        }
        tb.empty().append(newBody);
        
        $("#tableProp").trigger('create')
    });    

	var salesBody = "";

	// loop to add rows into a table
	for(var i = 0; i < cars.length; i++)
	{
		var row = "<tr>" + 
					"<td>" + cars[i].brand + "</td>" +
					"<td>" + cars[i].model + "</td>" +
					"<td>" + cars[i].price + "</td>" +
					"<td>" + salesData[i] + "</td>" +
					"<td>" + cars[i].color + "</td>" +
				"</tr>";
		salesBody += row;
	}
	$("#salesTable tbody").empty().append(salesBody);
    
    $("#salesTable").trigger("create");


	var ratingBody = "";

	// loop to add rows into a table
	for(var i = 0; i < cars.length; i++)
	{
		var row = "<tr>" + 
					"<td>" + cars[i].brand + "</td>" +
					"<td>" + cars[i].model + "</td>" +
					"<td>" + cars[i].price + "</td>" +
					"<td>" + rateData[i] + "</td>" +
				"</tr>";
		ratingBody += row;
	}
	$("#ratingTable tbody").empty().append(ratingBody);
    
    $("#ratingTable").trigger("create");
};

// add a click event to show sales table
$(document).on("click", "#showSales", function() {

	$("#salesTable").toggle();
});

// add a click event to show rating table
$(document).on("click", "#showRating", function() {

	$("#ratingTable").toggle();
});
