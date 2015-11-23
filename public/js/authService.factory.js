(function(){
    'use strict';

    angular.module('openImageFeed')
        .factory('AuthService',AuthService);

    AuthService.$inject = ['$http','Session','$mdDialog','UserModel'];

    function AuthService($http, Session,$mdDialog,UserModel) {
        return {
            login           : login,
            signup          : signup,
            profile         : profile,
            isAuthenticated : isAuthenticated,
            showLoginDialog : showLoginDialog
        };

        /////////

        function isAuthenticated() {
            return !!Session.userId;
        }

        function login(credentials) {
            return $http
                .post('/user/login', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    UserModel.currentUser = res.data.user;
                    return UserModel.currentUser;
                });
        }

        function profile(){
            return $http
                .get('/user/profile')
                .then(function (res) {
                    if(res.data.user) {
                        Session.create(res.data.sessionID, res.data.user.id);
                        UserModel.currentUser = res.data.user;
                        return UserModel.currentUser;
                    }
                    return null;
                });
        }

        function showLoginDialog() {
            $mdDialog.show({
                controller          : 'LoginController',
                templateUrl         : 'partials/login',
                parent              : angular.element(document.body),
                clickOutsideToClose :true
            });
        }

        function signup(credentials) {
            return $http
                .post('/user/signup', credentials)
                .then(function (res) {
                    Session.create(res.data.sessionID, res.data.user.id);
                    UserModel.currentUser = res.data.user;
                    return UserModel.currentUser;
                });
        }



    }
})();
