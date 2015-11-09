(function(){
    'use strict';

    angular.module('openImageFeed')
        .factory(AuthService);

    AuthService.$inject = ['$http','Session'];

    function AuthService($http, Session) {
        var currentUser = {};
        return {
            currentUser: currentUser,
            login: login,
            signup: signup,
            profile: profile,
            isAuthenticated: isAuthenticated
        };

        function login(credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    currentUser = res.data.user;
                    return currentUser;
                });
        }

        function signup(credentials) {
            return $http
                .post('/signup', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    currentUser = res.data.user;
                    return currentUser;
                });
        }

        function profile(){
            return $http
                .get('/profile')
                .then(function (res) {
                    if(res.data.user != null) {
                        Session.create(res.data.sessionID, res.data.user.id);
                        currentUser = res.data.user;
                        return currentUser;
                    }
                    return null;
                });
        }

        function isAuthenticated() {
            return !!Session.userId;
        }
    }
})();