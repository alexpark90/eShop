/**
 * 	Name: Alex Yeji Park, Laura Martinez
 *  Date: 
 *	This is the main javascript for eShop
 */

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