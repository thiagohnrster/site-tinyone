/* ========================= */
/* Funções do document.ready */
/* ========================= */

/*global $, jQuery, alert*/
/*jshint ignore: start*/
$(function () {
	'use strict';
	/* Função do menu responsivo */
	function responsiveNavigation() {
		/* Variável que armazena o tamanho da janela do browser */
		var winSize = $(window).width(),
			/* Variável que armazena a classe do menu */
			nav = $('.navbar');
		/* Se o tamanho da janela do browser for menor ou igual a 1024px */
		if(winSize <= 1024) {
			/* Mostra o tamanho da janela do browser no console */
			console.log(winSize);
			/* Executa a animação de abrir e fechar do menu */
			$('.navbar-btn').on('click', function (e) {
				$(this).parents('.navbar').find('.navbar-nav-right').animate({
					height: 'toggle',
					opacity: 'toggle'
				}, 200);
				event.stopPropagation();
			});
			/* Executa a animação de fechar o menu */ 
			$('.navbar-btn-close').on('click', function (e) {
				$(this).parents('.navbar').find('.navbar-nav-right').fadeOut(200);
				event.stopPropagation();
			});
			/* Aplica a classe do menu fixo ao dar scroll na página */
			$(window).scroll(function () {
				if ($(this).scrollTop() > 150) {
					nav.addClass('navbar-fixed');
				} else {
					nav.removeClass('navbar-fixed');
				}
			});
		}	 
	}
	/* Chamada das funções principais */
	responsiveNavigation();
});