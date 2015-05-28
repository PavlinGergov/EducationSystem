'use strict';

describe('RegisterCtrl:', function() {
  beforeEach(module('educationSystemApp.auth'));
  var scope, ctrl, mockService, q, deferred, mockUser, mockUrl, spy;

  beforeEach(function() {
    mockUser = {
      email: 'test@test.com',
      password: 123,
      name: 'firstName lastName'
    };

    mockService = {
      register: function(user) {
        deferred = q.defer();
        return deferred.promise;
      },
      splitName: function(name) {
        deferred = q.defer();
        return deferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    ctrl = $controller('registerCtrl', {
      $scope: scope,
      authService: mockService
    });
  }));

  it('should have register function', function(done) {
    expect(ctrl.register).to.be.a('function');
    done();
  });

  it('should have user object', function(done) {
    expect(ctrl.user).to.be.a('object');
    expect(ctrl.user).to.be.empty;
    done();
  });

  it('should call splitName function', function(done) {
    spy = sinon.spy(mockService, 'splitName');
    ctrl.user = mockUser;
    var formValid = true;
    ctrl.register(formValid);
    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(mockUser.name);
    spy.restore();
    done();
  });

  if('should pass user and url to register service when form is valid', function(done){
    spy = sinon.spy(mockService, 'register');
    ctrl.user = mockUser;
    var formValid = true;
    ctrl.register(formValid);
    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(mockUser, '');
    spy.restore();
    done();
  });

  it('should not call service when form is invalid', function(done){
    spy = sinon.spy(mockService, 'register');
    ctrl.user = mockUser;
    var formValid = false;
    ctrl.register(formValid);
    expect(spy).to.have.not.been.called;
    spy.restore();
    done();
  });
  
});
