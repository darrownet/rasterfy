'use strict';

describe('Controller: TogglrCtrl', function () {

  // load the controller's module
  beforeEach(module('rasterfyApp'));

  var TogglrCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TogglrCtrl = $controller('TogglrCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
