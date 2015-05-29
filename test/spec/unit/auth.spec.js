'use strict';

describe('Auth Module:', function () {

  // load the controller's module
  beforeEach(module('educationSystemApp.auth'));
  
  describe('Init and Dependencies', function() {
    var module, deps;
    var hasModule = function(module) {
      return deps.indexOf(module) >= 0;
    };
    
    beforeEach(function() {
      module = angular.module('educationSystemApp.auth');
      deps = module.value('educationSystemApp.auth').requires;
    });

    it('should be registered', function(done) {
      expect(module).to.exist;
      done();
    });

    it('should have ui.router as a dependency', function(done) {
      expect(hasModule('ui.router')).to.be.ok;
      done();
    });
  });

  describe('Routes:', function() {
    var state, config, service;
    
    beforeEach(module('ui.router'));
    beforeEach(inject(function($injector) {
      state = $injector.get('$state');
      service = $injector.get('authService');
    }));

    describe('Login State:', function() {
      before(function() {
        config = state.get('login');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('login');
        expect(config.url).to.equal('/login');
        expect(config.templateUrl).to.equal('views/auth/auth-login.html');
        expect(config.controller).to.equal('loginCtrl');
        expect(config.controllerAs).to.equal('vm');
        expect(state.href('login')).to.equal('#/login');
        done();
      });
    });

     describe('Logout State:', function() {
      before(function() {
        config = state.get('logout');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('logout');
        expect(config.url).to.equal('/logout');
        expect(config.templateUrl).to.be.undefined;
        expect(config.controller).to.equal('logoutCtrl');
        expect(config.controllerAs).to.equal('vm');
        expect(state.href('logout')).to.equal('#/logout');
        done();
      });
    });
    
    describe('Register State:', function() {
      before(function() {
        config = state.get('register');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('register');
        expect(config.url).to.equal('/register');
        expect(config.templateUrl).to.equal('views/auth/auth-register.html');
        expect(config.controller).to.equal('registerCtrl');
        expect(config.controllerAs).to.equal('vm');
        expect(state.href('register')).to.equal('#/register');
        done();
      });
    });

    describe('Register-from State:', function() {
      before(function() {
        config = state.get('register-from');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('register-from');
        expect(config.url).to.equal('/register/:from');
        expect(config.templateUrl).to.be.undefined;
        expect(config.controller).to.be.a('function');
        expect(config.controllerAs).to.be.undefined;
        expect(state.href('register-from')).to.equal('#/register/');
        done();
      });
    });

    describe('Activate State:', function() {
      before(function() {
        config = state.get('activate');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('activate');
        expect(config.url).to.equal('/activate/:uid/:token');
        expect(config.templateUrl).to.equal(undefined);
        expect(config.controller).to.equal('activateCtrl');
        expect(config.controllerAs).to.equal('vm');
        expect(state.href('activate')).to.equal('#/activate//');
        done();
      });
    });

    describe('Register State:', function() {
      before(function() {
        config = state.get('register');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('register');
        expect(config.url).to.equal('/register');
        expect(config.templateUrl).to.equal('views/auth/auth-register.html');
        expect(config.controller).to.equal('registerCtrl');
        expect(config.controllerAs).to.equal('vm');
        expect(state.href('register')).to.equal('#/register');
        done();
      });
    });

    describe('Register-from State:', function() {
      before(function() {
        config = state.get('register-from');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('register-from');
        expect(config.url).to.equal('/register/:from');
        expect(config.templateUrl).to.be.undefined;
        expect(config.controller).to.be.an('function');
        expect(config.controllerAs).to.be.undefined;
        expect(state.href('register-from')).to.equal('#/register/');
        done();
      });
    });

    describe('Activation-msg State:', function() {
      before(function() {
        config = state.get('activation-msg');
      });

      it('should have correct configuration', function(done) {
        expect(config.name).to.equal('activation-msg');
        expect(config.url).to.be.undefined;
        expect(config.templateUrl).to.equal('views/auth/auth-activation.html');
        expect(config.controller).to.be.undefined;
        expect(config.controllerAs).to.be.undefined;
        expect(state.href('activation-msg')).to.be.null;
        done();
      });
    });

    describe('Profile State:', function() {
      before(function() {
        config = state.get('profile');
      });

      it('should have correct configuration', function(done) {
     
        expect(config.name).to.equal('profile');
        expect(config.url).to.equal('/profile');
        expect(config.templateUrl).to.equal('views/auth/auth-profile.html');
        expect(config.controller).to.equal('profileCtrl');
        expect(config.controllerAs).to.equal('vm');
        expect(state.href('profile')).to.equal('#/profile');
        expect(config.resolve).to.be.a('object');
        expect(config.resolve.user).to.be.a('function');
        done();
      });
    });

    it("", function() {});
  });
});
