"use strict";

// Swiper initializing
$(document).ready(function () {
	//initialize swiper when document ready
	/*var mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		loop: true
	})*/

	var swiper = new Swiper('.slider_women .swiper-container', {
		/*slidesPerView: 2,*/
		slidesPerView: 'auto',
		spaceBetween: 0,
		/*effect: 'fade',*/
		/*pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},*/
		navigation: {
			nextEl: '.slider_women .slider--btn_next',
			prevEl: '.slider_women .slider--btn_prev',
		},
	});

	var swiper = new Swiper('.slider_building .swiper-container', {
		/*slidesPerView: 1,*/
		slidesPerView: 'auto',
		spaceBetween: 8,
		/*effect: 'fade',*/
		/*pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},*/
		navigation: {
			nextEl: '.slider_building .slider--btn_next',
			prevEl: '.slider_building .slider--btn_prev',
		},
	});
});
