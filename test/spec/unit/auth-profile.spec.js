'use strict';

describe('ProfileCtrl:', function() {
  beforeEach(module('educationSystemApp.auth'));
  var scope, ctrl, mockService, q, deferred, mockUser, spy;

  beforeEach(function() {
    mockUser = {
      email: 'test@test.com',
      password: 123
    };

    mockService = {
      profile: function(user) {
        deferred = q.defer();
        return deferred.promise;
      }
    };
  });

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    ctrl = $controller('profileCtrl', {
      $scope: scope,
      user: mockUser
    });
  }));

  it('should have user object', function(done) {
    expect(ctrl.user).to.be.a('object');
    expect(ctrl.user).to.not.be.empty;
    done();
  });
});
