/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: 
 *	This is the main javascript for eShop
 */

 // global variables
var mySwiper;
var cars;
var carId;
var admin;


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

	$.ajax({
		type : "GET",
		url : "users.json",
		dataType : "json",
		success : function(data){
			admin = data.admin;
		},
		error : handleError
	});
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

// add a form submit event to login as an admin
$(document).on("submit", "form", function() {

	// if correct credentials are provided
	if($("#id").val() == admin.id && $("#pwd").val() == admin.password)
	{
		// go to admin page
		$(location).attr("href", "./admin.html");
	}
	else
	{
		// show error message
		$("#error").html("Incorrect ID or Password!").css("color", "red");
	}
	return false;
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

