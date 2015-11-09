(function(){
    'use strict';

    angular
        .module('openImageFeed')
        .config(AuthConfig);

    AuthConfig.$inject = ['$httpProvider'];

    function AuthConfig($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }
})();