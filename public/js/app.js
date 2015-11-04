'use strict';

// Declare app level module which depends on filters, and services

angular.module('openImageFeed', [
  'openImageFeed.controllers',
  'openImageFeed.filters',
  'openImageFeed.services',
  'openImageFeed.directives',
  'ngRoute',
  'ngMaterial',
  'ngFileUpload',
  'ngMessages'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home',
      controller: 'HomeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
