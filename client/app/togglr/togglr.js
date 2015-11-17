'use strict';

angular.module('rasterfyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('togglr', {
        url: '/togglr',
        templateUrl: 'app/togglr/togglr.html',
        controller: 'TogglrCtrl'
      });
  });
