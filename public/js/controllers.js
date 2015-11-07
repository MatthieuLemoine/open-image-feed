'use strict';

/* Controllers */

angular.module('openImageFeed.controllers', [])
    .controller('HomeCtrl', ['$scope','AUTH_EVENTS','AuthService','$mdDialog','$mdToast','$document', function ($scope,AUTH_EVENTS,AuthService,$mdDialog,$mdToast,$document){
        $scope.currentUser = null;
        $scope.isAuthenticated = AuthService.isAuthenticated;

        $scope.setCurrentUser = function (ev,user) {
            $scope.currentUser = user;
        };

        $scope.$on(AUTH_EVENTS.currentUser,$scope.setCurrentUser);

        $scope.showLoginDialog = function() {
            $mdDialog.show({
                controller: LoginController,
                templateUrl: 'partials/login',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        };
        $scope.toastPosition = {
            bottom : false,
            top : true,
            left : false,
            right : true
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };
        $scope.showSimpleToast = function(ev,message) {
            console.log('showSimpleToast');
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
                    .parent($document[0].querySelector('#add_post_parent'))
            );
        };
        $scope.$on(AUTH_EVENTS.notAuthenticated,$scope.showLoginDialog);
        $scope.$on(AUTH_EVENTS.sessionTimeout, $scope.showLoginDialog);
        $scope.$on(AUTH_EVENTS.notAuthorized,$scope.showLoginDialog);
        $scope.$on('showToast',$scope.showSimpleToast);

    }])
    .controller('FeedCtrl',['$scope','$http',function($scope,$http){
        $scope.showLoading = true;
        $scope.updateFeed = function() {
            $scope.showLoading = true;
            $http.get('/api/feed')
                .then(function successCallback(response) {
                    $scope.feed = response.data;
                    console.log(JSON.stringify($scope.feed));
                    $scope.showLoading = false;
                }, function errorCallback(response) {
                    $scope.showLoading = false;
                    // TODO Show error
                });
        };
        $scope.updateFeed();
        $scope.$on('updateFeed',function(){
            $scope.updateFeed();
        });
    }])
    .controller('PostCtrl',['$scope','$http','AuthService','$rootScope','AUTH_EVENTS',function($scope,$http,AuthService,$rootScope,AUTH_EVENTS){
        $scope.showComments = false;
        $scope.isCommentsLoading = false;
        $scope.showAddComment = false;
        $scope.newComment = {};

        $scope.toggleComments = function(post){
            $scope.showComments = ! $scope.showComments;
            if($scope.showComments){
                $scope.getComments(post);
            }
            else{
                $scope.showAddComment = false;
            }
        };
        $scope.upvote = function(post){
            if (!AuthService.isAuthenticated()) {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
            else {
                // TODO Upvote
            }
        };
        $scope.downvote = function(post){
            if (!AuthService.isAuthenticated()) {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
            else {
                // TODO Downvote
            }
        };

        $scope.showAddCommentForm = function(){
            if (!AuthService.isAuthenticated()) {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
            else {
                $scope.showAddComment = true;
            }
        };

        $scope.addComment = function(isValid){
            if (isValid && !$scope.isCommentsLoading) {
                $scope.uploadComment({content : $scope.newComment.content,post: $scope.post._id});
            }
            else{
                if($scope.isCommentsLoading){
                    $scope.showSimpleToast('Sending...');
                }
                else if(!isValid){
                    $scope.showSimpleToast('Invalid comment');
                }
            }
        };
        $scope.uploadComment = function (comment) {
            $scope.isCommentsLoading = true;
            $http
                .post('/api/comment', comment)
                .then(function successCallback(response) {
                    $scope.isCommentsLoading = false;
                    $scope.newComment = {};
                    $scope.showAddComment = false;
                    $rootScope.$broadcast('showToast','Comment added !');
                    $scope.getComments($scope.post)
                }, function errorCallback(response) {
                    $scope.isCommentsLoading = false;
                });
        };

        $scope.getComments = function(post){
            $scope.isCommentsLoading = true;
            $http.get('/api/comments/'+post._id)
                .then(function successCallback(response) {
                    $scope.post.comments = response.data;
                    $scope.isCommentsLoading = false;
                }, function errorCallback(response) {
                    $scope.isCommentsLoading = false;
                    // TODO Show error
                });
        }

    }])
    .controller('AddPostCtrl',['$scope','$mdDialog', '$mdToast','$rootScope','$document','AuthService','AUTH_EVENTS',function($scope, $mdDialog, $mdToast, $rootScope,$document,AuthService,AUTH_EVENTS){
        $scope.showAddDialog = function(ev) {
            if (!AuthService.isAuthenticated()) {
                ev.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
            else {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'partials/dialog',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (answer) {
                        $scope.showSimpleToast('Post added !');
                        $scope.updateFeed();
                    }, function () {
                        // Cancel
                    });
            }
        };
        $scope.toastPosition = {
            bottom : false,
            top : true,
            left : false,
            right : true
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };
        $scope.showSimpleToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
                    .parent($document[0].querySelector('#add_post_parent'))
            );
        };
        $scope.updateFeed = function(){
            $rootScope.$broadcast('updateFeed');
        }
    }]);

// Add post dialog
function DialogController($scope, $mdDialog, Upload, $mdToast, $document) {
    $scope.obj = {};
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.valid = function(isValid) {
        if (isValid && $scope.file && !$scope.showLoading) {
            $scope.upload($scope.file);
        }
        else{
            if(!$scope.file){
                $scope.showSimpleToast('An image is required');
            }
            else if($scope.showLoading){
                $scope.showSimpleToast('Your post is already uploading');
            }
            else if(!isValid){
                $scope.showSimpleToast('Form invalid');
            }
        }
    };
    $scope.upload = function (file) {
        $scope.showLoading = true;
        Upload.upload({
            url: '/api/post',
            data: {file: file, title: $scope.post.title}
        }).then(function (resp) {
            $scope.showLoading = false;
            $mdDialog.hide(true);
        }, function (resp) {
            $scope.showLoading = false;
            // TODO Show error
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.toastPosition = {
        bottom : false,
        top : true,
        left : false,
        right : true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };
    $scope.showSimpleToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position($scope.getToastPosition())
                .hideDelay(3000)
                .parent($document[0].querySelector('#dialog_parent'))
        );
    };
}

// Authenticate dialog
function LoginController($scope,$rootScope, AUTH_EVENTS, AuthService, $mdDialog, $mdToast, $document) {
    $scope.credentials = {
        username: '',
        password: '',
        password_confirm: ''
    };
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.validSignin = function(isValid) {
        if (isValid && !$scope.showLoading) {
            $scope.signin($scope.credentials);
        }
        else{
            if($scope.showLoading){
                $scope.showSimpleToast('Connecting...');
            }
            else if(!isValid){
                $scope.showSimpleToast('Form invalid');
            }
        }
    };
    $scope.signin = function (credentials) {
        $scope.showLoading = true;
        AuthService.login(credentials).then(function(user){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.$broadcast(AUTH_EVENTS.currentUser,user);
            $rootScope.$broadcast('showToast',"Hello "+user.username+" !");
            $scope.showLoading = false;
            $scope.hide();
        },function(){
            $scope.showLoading = false;
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        })
    };
    $scope.validSignup = function(isValid) {
        if (isValid && !$scope.showLoading) {
            console.log(JSON.stringify($scope.credentials));
            $scope.signup($scope.credentials);
        }
        else{
            if($scope.showLoading){
                $scope.showSimpleToast('Connecting...');
            }
            else if(!isValid){
                $scope.showSimpleToast('Form invalid');
            }
        }
    };
    $scope.signup = function (credentials) {
        $scope.showLoading = true;
        AuthService.signup(credentials).then(function(user){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.$broadcast(AUTH_EVENTS.currentUser,user);
            $rootScope.$broadcast('showToast',"Welcome "+user.username+" !");
            $scope.showLoading = false;
            $scope.hide();
        },function(){
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.showLoading = false;
        })
    };
    $scope.toastPosition = {
        bottom : false,
        top : true,
        left : false,
        right : true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };
    $scope.showSimpleToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position($scope.getToastPosition())
                .hideDelay(3000)
                .parent($document[0].querySelector('#signin_parent'))
        );
    };
}
