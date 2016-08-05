/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: 
 *	This is the main javascript for eShop
 */

 // global variables
var jsonData;
var mySwiper;
var cars;
var carId;
var totalCarSold;

//global variables for localStorage


//QUANTITY
var quantityCar0 = 0;
var quantityCar1 = 0;
var quantityCar2 = 0;
var quantityCar3 = 0;


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
});

// page envet for #carDetail
$(document).on("pagebeforeshow", "#carDetail", function() {
	handleDetailPage();
});

var handleMain = function(data) {

	// get cars array
	cars = data.cars;
	
	// remove all slide before adding
	mySwiper.removeAllSlides();

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

	//Add footer info
	$('[data-role="footer"]').append('<p>Project by: Alex Yeji Park and Laura Martinez</p>' +
		'<p>Mobile Web-Based Application Development</p>');
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

//function to get quantity
var getQuantity = function(){

	var quantity = $('#number-3').val();
	return quantity;
};


// function to handle error on calling json
var handleError = function(error) {
	
	alert("Error occured! " + error.state + " - " + error.statusText);
};



function rate(){
	$('#rate input').on('change', function() {

		//retrieve value from rate radio choices
		var rate = parseInt( $('input[name=radio-choice-t-6]:checked', '#rate').val());
		//local variables to retrieve car data
		var carNum = parseInt(getCarId());


        var localStorageCarRate = localStorage.getItem('eShop_car' + carNum + '_rate');

		// check car Num and calculate rate
		if( localStorageCarRate == 'undefined' || localStorageCarRate == null){
             localStorage.setItem('eShop_car' + carNum + '_rate', rate);

		}else{
            var parseRate = parseInt(localStorage.getItem('eShop_car' + carNum + '_rate'));
			var calculateRate = ( parseRate + rate) / 2;

			localStorage.setItem('eShop_car' + carNum + '_rate', calculateRate);
		}


	});

};

//Function for buy button
function buy(){
	$("#buy").click(function(){
		//Retrieve quantity
		var quantity = parseInt(getQuantity());

		if( isNaN(quantity) ){
			quantity = 1;
		}


		//Retrieve car number selected
		var carNum = parseInt(getCarId());

		//Retrieve local storage for sale of cars
		var getLocalStorageCarSale = localStorage.getItem('eShop_car' + carNum + '_sale');

		if( getLocalStorageCarSale == 'undefined' || getLocalStorageCarSale == null ){
			localStorage.setItem('eShop_car' + carNum + '_sale', quantity );

		}

			var currentQuantity = parseInt(getLocalStorageCarSale);

			var totalQuantity = currentQuantity + quantity;

			localStorage.setItem('eShop_car' + carNum + '_sale', totalQuantity);

		    alert("You succesfully bought  in Car eShop");

		   //redirect to main page
		   window.location.href="./index.html";


	});
};

function formatCurrency(){

	//local variables to retrieve car data
	var carNum = getCarId();
	var car = cars[carNum];
	var carPrice = parseInt(car.price);

	console.log("carPrice" + carPrice);


	var carFormat = carPrice.toLocaleString("en");
	console.log("format price: " + carFormat);

	//Add price to div price tag
	$("#price").append("$ " + carFormat);

	};



var handleDetailPage = function(){

	//Call rate function
	rate();
	//Call buy function
	buy();

	//local variables to retrieve car data
	var carNum = getCarId();
	var car = cars[carNum];

	//Add photo to car detail
	$(".photo").append(
		"<img src='img/eCar" + carNum + ".png' />"
	);

	//Call formatCurrency function
	formatCurrency();

	//Add photo to collapsible
	$("#specs").html(car.spec);



};

