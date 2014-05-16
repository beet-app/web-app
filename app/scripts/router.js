BeetApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('index', {
            url: '/',
            controller: 'IndexController'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .state('menu', {
            url: '/menu',
            templateUrl: 'views/menu/menu.html',
            controller: 'MenuController'
        })

        .state('todo', {
            url: '/todo',
            templateUrl: 'views/todo/todo.html',
            controller: 'TodoController'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

});



BeetApp.run(function ($rootScope, $location) {

    $rootScope.$on('$routeChangeStart', function(next, current){
        console.debug('Could not change route! Not authenticated!');
    });
});






















//var appRoutes = angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//
//    $routeProvider
//
//        // home page
//        .when('/', {
//            alert("a");
//            templateUrl: 'views/home.html',
//            controller: 'MainController'
//        })
//
//        // nerds page that will use the NerdController
//        .when('/todo', {
//            templateUrl: 'views/todo/todo.html',
//            controller: 'TodoController'
//        })
//
//        .when('/menu', {
//            templateUrl: 'views/menu/menu.html',
//            controller: 'MenuController'
//        })
//
//
//    $locationProvider.html5Mode(true);
//
//}]);