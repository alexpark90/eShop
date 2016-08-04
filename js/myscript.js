/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: 
 *	This is the main javascript for eShop
 */

 // global variables
var mySwiper;
var cars;
var carId;


$(document).ready(function () {

	//initialize swiper when document ready  
	mySwiper = new Swiper ('.swiper-container', {
		
		direction: 'horizontal',
  		loop: true,
	    pagination: '.swiper-pagination',
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev'
	});

	// temporaty actions to test admin page
	for(var i = 0; i < 4; i++)
	{
		localStorage.setItem("eShop_car" + i + "_rate", i + 2);	
		localStorage.setItem("eShop_car" + i + "_sale", i + 5);
	}
});


// page envet for #home
$(document).on("pagebeforeshow", "#home", function() {

	$.ajax({
		type : "GET",
		url : "cars.json",
		dataType : "json",
		success : handleMain,
		error : handleError
	});
});


$(document).on("pageshow", "#admin", function() {

	handleAdmin();
});


var handleMain = function(data) {

	// get cars array
	cars = data.cars;
	
	// remove all slide before adding
	mySwiper.removeAllSlides();

	// reset car-list before adding
	$(".car-list").html("");

	// loop through all car in the array
	for(var i = 0; i < cars.length; i++)
	{
		// add a car to the slide
		mySwiper.appendSlide(
								"<div class='swiper-slide'>" +
									"<a href='#carDetail' id='car" + i + "'>" + 
										"<img src='img/" + cars[i].id + ".png' />" +
									"</a>" +
								"</div>"
							);

		// add a car to the list
		$(".car-list").append(
							"<li li-id='" + i +"''>" +
								"<a href='#carDetail'>" +
									"<img src='img/" + cars[i].id + ".png' />" + cars[i].brand + " " + cars[i].model +
								"</a>" +
							"</li>"
							);

		// refresh the list
		$(".car-list").listview("refresh");
	}
};



// add click event for all li under .car-list
$(document).on("click", ".car-list >li", function() {

	var id = $(this).closest("li").attr("li-id");
	setCarId(id);
});

// add click event for all slide image
$(document).on("click", ".swiper-slide >a", function() {

	var id = $(this).closest("a").attr("id").charAt(3);
	setCarId(id);
});


// function to set car id
var setCarId = function(id) {
	
	carId = id;
};

// function to get car id
var getCarId = function() {

	var value = carId;
	return value;
};

// function to handle error on calling json
var handleError = function(error) {
	
	alert("Error occured! " + error.state + " - " + error.statusText);
};

var handleAdmin = function() {

	var rateTitle = "Average Rating";
	var salesTitle = "Car Sales";
	var carLabels = [];
	var rateData = [];
	var salesData = [];

	// loop to set labels and data for graphs
	for(var i = 0; i < cars.length; i++)
	{
		// set names of cars as for labels
		carLabels[i] = cars[i].brand;

		// get values from local storage
		var rate = localStorage.getItem("eShop_car" + i + "_rate");
		var sales = localStorage.getItem("eShop_car" + i + "_sale");
		var colors = [ "#F44336", "#4CAF50", "#9C27B0", "#2196F3" ];

		// assign 0 value if there is no data in local storage
		rate != 'undefined' ? rateData[i] = rate : rateData[i] = 0;
		salesData != 'undefined' ? salesData[i] = sales : salesData[i] = 0;
	}

	// create a bar chart for ratings 
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

	// create a donught chart for sales 
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