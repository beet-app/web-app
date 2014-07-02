BeetApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          }, 
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
             $location.url('/login');
             return $q.reject(response);
          }
        );
      }
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        //.state('index', {
        //    url: '/',
        //    controller: 'IndexController'
        //})

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .state('logout', {
            url: '/logout',
            controller: 'LogoutController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignupController'
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

        .state('person/create', {
            url: '/person/create',
            templateUrl: 'views/person/person.html',
            controller: 'PersonController'
        })     

        .state('person/edit', {
            url: '/person/edit/:personId',
            templateUrl: 'views/person/person.html',
            controller: 'PersonController'
        })        

        .state('person/list', {
            url: '/person/list',
            templateUrl: 'views/person/person-list.html',
            controller: 'PersonListController'
        })

        .state('company/create', {
            url: '/company/create',
            templateUrl: 'views/company/company.html',
            controller: 'CompanyController'
        })     

        .state('company/edit', {
            url: '/company/edit/:companyId',
            templateUrl: 'views/company/company.html',
            controller: 'CompanyController'
        })        

        .state('company/list', {
            url: '/company/list',
            templateUrl: 'views/company/list.html',
            controller: 'CompanyListController'
        })

        .state('user/edit', {
            url: '/user/edit/:_id',
            templateUrl: 'views/user/user.html',
            controller: 'UserController'
        })        


/*
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
*/
});


BeetApp.run(function ($rootScope, $location) {

    $rootScope.$on('$viewContentLoaded', function(next, current){

        $(".current").removeClass("current");

        var actual = $("a[ui-sref='" + $location.path().replace("/","") + "']");

        if ($(actual).parents("li").length == 1){

            $(actual).parent("li").addClass("current");
        }else{
            $(actual).parent("li").addClass("current");
            $(actual).parent("li").parents("li").addClass("active current hasSub");
        }

        //

    });

});
/*

BeetApp.run(function ($rootScope, $location) {

    $rootScope.$on('$stateChangeStart', function(next, current){
        console.debug('Could not change route! Not authenticated!');
    });
});


*/



















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