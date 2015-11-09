(function(){
    angular
        .module('openImageFeed')
        .config(routerConfig);

    function routerConfig($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
})();