'use strict';

angular.module('rasterfyMongoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('togglr', {
        url: '/togglr',
        templateUrl: 'app/togglr/togglr.html',
        controller: 'TogglrCtrl'
      });
  });
