'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('openImageFeed.services', []).
    value('version', '0.1')
    .factory('AuthService', function ($http, Session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    return res.data.user;
                });
        };

        authService.signup = function (credentials) {
            return $http
                .post('/signup', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    return res.data.user;
                });
        };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        return authService;
    })
    .service('Session', function () {
        this.create = function (sessionId, userId) {
            this.id = sessionId;
            this.userId = userId;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
        };
    })



