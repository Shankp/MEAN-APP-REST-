 angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {
        templateUrl : '/views/home.html',
        controller: 'MainController'
    })
        .when('/events', {
            templateUrl : '/views/events.html',
            controller: 'EventController'
        })


        .when('/EventWindow', {
            templateUrl: '/views/EventsInteract.html',
            controller: 'FileUploaderController'
        })

        .when('/UploadEvents', {
            templateUrl: '/views/UploadEvents.html',
            controller: 'FileUploaderController'
        })
        .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);
