'use strict';

describe('ActivateCtrl:', function() {
  beforeEach(module('educationSystemApp.auth'));
  var scope, ctrl, mockService, q, deferred, mockData, spy;

  beforeEach(function() {
    mockData = {
      firstParameter: 'parameter1',
      secondParameter: 'parameter2'
    };

    mockService = {
      activate: function(data) {
        deferred = q.defer();
        return deferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, $rootScope, $q) {
    spy = sinon.spy(mockService, 'activate');
    scope = $rootScope.$new();
    q = $q;
    ctrl = $controller('activateCtrl', {
      $scope: scope,
      $stateParams: mockData,
      authService: mockService
    });
    ctrl.data = mockData;
  }));

  afterEach(function() {
    spy.restore();
  });

  it('should have data object', function(done) {
    expect(ctrl.data).to.be.a('object');
    expect(ctrl.data).to.not.be.empty;
    done();
  });

  it('should call auth function', function(done) {
    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(ctrl.data);
    done();
  });
});
