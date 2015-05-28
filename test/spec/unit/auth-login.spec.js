'use strict';

describe('LoginCtrl:', function() {
  beforeEach(module('educationSystemApp.auth'));
  var scope, ctrl, mockService, q, deferred, mockUser, spy;

  beforeEach(function() {
    mockUser = {
      email: 'test@test.com',
      password: 123
    };

    mockService = {
      login: function(user) {
        deferred = q.defer();
        return deferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    ctrl = $controller('loginCtrl', {
      $scope: scope,
      authService: mockService
    });
  }));

  it('should have login function', function(done) {
    expect(ctrl.login).to.be.a('function');
    done();
  });

  it('should have user object', function(done) {
    expect(ctrl.user).to.be.a('object');
    expect(ctrl.user).to.be.empty;
    done();
  });

  it('should pass data to service', function(done) {
    spy = sinon.spy(mockService, 'login');
    ctrl.user = mockUser;
    ctrl.login();
    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(mockUser);
    spy.restore();
    done();
  })
  
});
