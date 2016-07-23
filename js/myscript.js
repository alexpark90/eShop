/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: 
 *	This is the main javascript for eShop
 */
var jsonData;

$(document).ready(function () {

	//initialize swiper when document ready  
	var mySwiper = new Swiper ('.swiper-container', {
		
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
		success : function(data) {
			jsonData = data;
			handleMain(data);
		},
		error : function(error) {
			alert("Error occured! " + error.state + " - " + error.statusText);
		}
	});
});

var handleMain = function(data) {

	var cars = data.cars;
	console.log(cars[0]);
};