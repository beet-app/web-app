var BeetApp = angular.module('beetApp', ['ui.router','pascalprecht.translate']);


BeetApp.config(function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
	  prefix: '/scripts/languages/',
	  suffix: '.json'
	});	
	$translateProvider.preferredLanguage('pt_br');
});
