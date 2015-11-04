'use strict';

/* Controllers */

angular.module('openImageFeed.controllers', [])
    .controller('HomeCtrl', ['$scope', function ($scope){

    }])
    .controller('FeedCtrl',['$scope','$http',function($scope,$http){
        $scope.showLoading = true;
        $scope.updateFeed = function() {
            $scope.showLoading = true;
            $http.get('/api/feed')
                .then(function successCallback(response) {
                    $scope.feed = response.data;
                    $scope.showLoading = false;
                }, function errorCallback(response) {
                    $scope.showLoading = false;
                    // TODO Show error
                });
        };
        $scope.updateFeed();
        $scope.$on('updateFeed',function(){
            $scope.updateFeed();
        })
    }])
    .controller('AddPostCtrl',['$scope','$mdDialog', '$mdToast','$rootScope',function($scope, $mdDialog, $mdToast, $rootScope){
        $scope.showAddDialog = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'partials/dialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
            .then(function(answer) {
                $scope.showSimpleToast('Post added !');
                $scope.updateFeed();
            }, function() {
                // Cancel
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
            );
        };
        $scope.updateFeed = function(){
            $rootScope.$broadcast('updateFeed');
        }
    }]);

function DialogController($scope, $mdDialog, Upload) {
    $scope.obj = {};
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.valid = function(isValid) {
        if (isValid && $scope.file) {
            $scope.upload($scope.file);
        }
    };
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/post',
            data: {file: file, author: $scope.post.author, title: $scope.post.title}
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
}
