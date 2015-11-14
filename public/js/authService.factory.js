(function(){
    'use strict';

    angular.module('openImageFeed')
        .factory('AuthService',AuthService);

    AuthService.$inject = ['$http','Session','$mdDialog','UserModel'];

    function AuthService($http, Session,$mdDialog,UserModel) {
        return {
            login: login,
            signup: signup,
            profile: profile,
            isAuthenticated: isAuthenticated,
            showLoginDialog: showLoginDialog
        };

        /////////

        function isAuthenticated() {
            return !!Session.userId;
        }

        function login(credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    UserModel.currentUser = res.data.user;
                    console.log("login : user ="+currentUser);
                    return UserModel.currentUser;
                });
        }

        function profile(){
            return $http
                .get('/profile')
                .then(function (res) {
                    if(res.data.user !== null) {
                        Session.create(res.data.sessionID, res.data.user.id);
                        UserModel.currentUser = res.data.user;
                        return UserModel.currentUser;
                    }
                    return null;
                });
        }

        function showLoginDialog() {
            $mdDialog.show({
                controller: 'LoginController',
                templateUrl: 'partials/login',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        }

        function signup(credentials) {
            return $http
                .post('/signup', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    UserModel.currentUser = res.data.user;
                    return UserModel.currentUser;
                });
        }



    }
})();
