/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: Aug. 05. 2016
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

// page envet for #carDetail
$(document).on("pagebeforeshow", "#carDetail", function() {

	handleDetailPage();
});


// function to handle main page
var handleMain = function(data) {

	// get cars array
	// and assign it into a global variable
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

	// add footer info
	$('[data-role="footer"]').empty().append('<p>Project by: Alex Yeji Park and Laura Martinez</p>' +
		'<p>Mobile Web-Based Application Development</p>');
};


// function to handle detail page
var handleDetailPage = function() {

	// local variables to retrieve car data
	var carId = getCarId();
	var car = cars[carId];

	// add photo to car detail
	$(".photo").empty().append(
		"<img src='img/eCar" + carId + ".png' />"
	);

	// get formatted price using formatCurrency function
	var priceFormat = formatCurrency(car.price);

	// add formatted price to div price tag
	$("#price").empty().append("$ " + priceFormat);

	// add car spec to collapsible
	$("#specs").html(car.spec);
};


// function to handle error on calling json
var handleError = function(error) {
	
	alert("Error occured! " + error.state + " - " + error.statusText);
};


//////////////////////////////////////////////////////////////
////////////////////////// events ////////////////////////////

// add click event for all li under .car-list in main page
$(document).on("click", ".car-list >li", function() {

	var id = $(this).closest("li").attr("li-id");
	setCarId(id);
});

// add click event for all slide image in main page
$(document).on("click", ".swiper-slide >a", function() {

	var id = $(this).closest("a").attr("id").charAt(3);
	setCarId(id);
});

// add click event for buy button in detail page
$(document).on("click", "#buy", function() {

	if(!(window.localStorage))
	{
		alert("[Error] localStorage is not supported!");
		return;
	}

	// retrieve quantity a user selected
	var quantity = parseInt(getQuantity());

	// retrieve car id selected
	var carId = getCarId();

	//Retrieve local storage for sale of cars
	var localStorageCarSale = localStorage.getItem('eShop_car' + carId + '_sale');


	// check if corresponding localstorage data exists 
	// if it does not, set initial value as 0 (none sold yet)
	if( localStorageCarSale == 'undefined' || localStorageCarSale == null ){
		localStorage.setItem('eShop_car' + carId + '_sale', 0);
	}

	var currentQuantity = parseInt(localStorageCarSale);
	var totalQuantity = currentQuantity + quantity;

	// set local storage with calculated total quantity
	localStorage.setItem('eShop_car' + carId + '_sale', totalQuantity);

    alert("You succesfully bought  in Car eShop");

   	// redirect to main page
   	window.location.href="./index.html";
});


// add change event for rating input buttons in detail page
$(document).on("change", "#rate input", function() {

	if(!(window.localStorage))
	{
		alert("[Error] localStorage is not supported!");
		return;
	}
	
	// retrieve value from rate radio choices
	var rate = parseInt( $('input[name=radio-choice-t-6]:checked', '#rate').val());

	// local variable to retrieve car data
	var carId = getCarId();


    var localStorageCarRate = localStorage.getItem('eShop_car' + carId + '_rate');

	// check if corresponding localstorage data exists 
	// if it does not, set initial value with rate
	// or if it does exist, sum rate with existing rate and assign average rate
	if( localStorageCarRate == 'undefined' || localStorageCarRate == null) {
         localStorage.setItem('eShop_car' + carId + '_rate', rate);

	}else{
        var parseRate = parseInt(localStorage.getItem('eShop_car' + carId + '_rate'));
		var calculateRate = ( parseRate + rate) / 2;

		localStorage.setItem('eShop_car' + carId + '_rate', calculateRate);
	}
});


// add a form submit event to login as an admin on login dialog
$(document).on("submit", "#loginForm", function() {

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


/////////////////////////////////////////////////////////////
///////////////////// global functions //////////////////////

// function to set car id
var setCarId = function(id) {
	
	carId = id;
};

// function to get car id
var getCarId = function() {

	var value = carId;
	return value;
};


//function to get quantity
var getQuantity = function(){

	var quantity = $('#number-3').val();
	return quantity;
};

// function to format price
// it take an number as a parameter
var formatCurrency = function(price) {

	var origPrice = parseInt(price);
	var formatted = origPrice.toLocaleString("en");
	return formatted;
};

