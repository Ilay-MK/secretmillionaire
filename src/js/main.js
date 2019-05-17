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
		slidesPerView: 3,
		spaceBetween: 0,
		slidesPerGroup: 3,
		grabCursor: true,
		virtualTranslate: true,
		/*freeMode: true,*/
		// Responsive breakpoints
		/*breakpointsInverse: true,*/
		breakpoints: {
			// when window width is <= 320px
			1023.98: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				virtualTranslate: false
			},
			// when window width is <= 480px
			1439.98: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				virtualTranslate: false
			}
		},
		/*speed: 300,*/
		/*loop: true,*/
		/*loopFillGroupWithBlank: true,*/
		navigation: {
			nextEl: '.slider_women .slider--btn_next',
			prevEl: '.slider_women .slider--btn_prev',
		},
		on: {
			init: function (swiper) {
				var cnt = 1,
					firstThree = true;
				console.log('swiper initialized');

				$('.slider_women .swiper-slide').each(function (i, elem) {
					if (cnt > 3) {
						cnt = 1;
						firstThree = false;
					}

					if(firstThree) $(elem).css("opacity", "1");
					$(elem).addClass("swiper-slide-" + cnt++);
				});
			},
			slideChange: function (swiper) { //runs callback in slide change start
				var $container = $('.slider_women');
				$('.slider_women .swiper-wrapper').fadeTo(300, 0, function () {
					$container.toggleClass("slider-inverse");
					$container.find('.swiper-slide').css("opacity", "0");
					$container.find('.swiper-slide-active, .swiper-slide-next, .swiper-slide-next + .swiper-slide').css("opacity", "1");
					$(this).fadeTo(250, 1, function () {});
				});
			},
			/*slideChangeTransitionStart: function (swiper) {
				$('.slider_women .swiper-wrapper').fadeTo(300, 0, function () {
					$('.slider_women').toggleClass("slider-inverse");
					$(this).fadeTo(250, 1, function () {});
				});
			}*/
		}
	});

	swiperWomen.on('slideChangeTransitionStart', function () {
		/*$('.slider_women').toggleClass("slider-inverse");*/
		/*$('.slider_women .swiper-slide').removeClass("swiper-slide-1 swiper-slide-2 swiper-slide-3");
		$('.slider_women .swiper-slide-active').addClass("swiper-slide-1");
		$('.slider_women .swiper-slide-next').addClass("swiper-slide-2");
		$('.slider_women .swiper-slide-next+.swiper-slide').toggleClass("swiper-slide-3");*/
	});

	swiperWomen.on('slideChangeTransitionEnd', function () {

	});

	var swiperBuilding = new Swiper('.slider_building .swiper-container', {
		/*slidesPerView: 1,*/
		slidesPerView: 'auto',
		spaceBetween: 8,
		grabCursor: true,
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
