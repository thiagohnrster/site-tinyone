$(function() {
    'use strict';

    function responsiveNavigation() {
        var winSize = $(window).width(),
            nav = $('.navbar'),
            overlay = $('<div></div>');

            overlay.addClass('overlay');

        if (winSize <= 1024) {
            nav.addClass('navbar-fixed');

            $('.navbar-btn').on('click', function() {
            	$(this).toggleClass('navbar-btn-open');

                $(this).parents('.navbar').find('.navbar-nav-right').animate({
                    width: 'toggle'
                }, 300);

                if($(this).hasClass('navbar-btn-open')) {
                    $('body').addClass('page-no-scroll');
                    $('.navbar').append(overlay).hide().fadeIn(200);
                } else {
                    $('body').removeClass('page-no-scroll');
                    $(overlay).remove();
                }
            });

            $(window).scroll(function() {
                if ($(this).scrollTop() > 10) {
                    $('.navbar-fixed').addClass('navbar-cover');
                } else {
                    $('.navbar-fixed').removeClass('navbar-cover');
                }
            });
        }

        $(window).on('resize', function () {
        	if($(this).width() > 1024) {
        		$('.navbar').removeClass('navbar-fixed');
        		$('.navbar-nav-right').show();
        	} else {
        		$('.navbar').addClass('navbar-fixed');
        		$('.navbar-nav-right').hide();
        	}
        })
    }

    function removeMobileUILoader() {
        $('.ui-loader').remove();
    }

    removeMobileUILoader();
    responsiveNavigation();
});
