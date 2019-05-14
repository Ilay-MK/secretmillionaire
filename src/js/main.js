"use strict";

// Swiper initializing
$(document).ready(function () {
	//initialize swiper when document ready
	/*var mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		loop: true
	})*/
	var swiperWomen = new Swiper('.slider_women .swiper-container', {
		/*slidesPerView: 2,*/
		slidesPerView: '3',
		spaceBetween: 0,
		slidesPerGroup: 1,
		// Responsive breakpoints
		breakpoints: {
			// when window width is <= 320px
			1023.98: {
				slidesPerView: 1,
				slidesPerGroup: 1
			},
			// when window width is <= 480px
			1439.98: {
				slidesPerView: 2,
				slidesPerGroup: 2
			}
		},
		speed: 900,
		/*loop: true,*/
		/*loopFillGroupWithBlank: true,*/
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

	swiperWomen.on('slideChangeTransitionStart', function () {
		//$('.slider_women .swiper-slide').css("opacity", ".3");
		if ($('.slider_women .swiper-slide').hasClass("inverse")) {
			$('.slider_women .swiper-slide').removeClass("inverse");
		} else {
			$('.slider_women .swiper-slide').addClass("inverse");
		}
	});
	swiperWomen.on('slideChangeTransitionEnd', function () {
		/*$('.slider_women .swiper-slide').css("opacity", "1");*/
	});

	var swiperBuilding = new Swiper('.slider_building .swiper-container', {
		slidesPerView: '2',
		spaceBetween: 25,
		//autoHeight: true, //enable auto height
		/*slidesPerGroup: 2,*/
		breakpoints: {
			1439.98: {
				slidesPerView: 'auto'
			}
		},
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
