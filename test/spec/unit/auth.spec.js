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
    var state, config;
    
    beforeEach(module('ui.router'));
    beforeEach(inject(function($injector) {
      state = $injector.get('$state');
    }));

    describe('Login State:', function() {
      before(function() {
        config = state.get('login');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('login');
        done();
      });

      it('should have correct url', function(done) {
        expect(config.url).to.equal('/login');
        done();
      });

      it('should have correct templateUrl', function(done) {
        expect(config.templateUrl).to.equal('views/auth/auth-login.html');
        done();
      });

      it('should have correct controller', function(done) {
        expect(config.controller).to.equal('loginCtrl');
        done();
      });

      it('should have correct controllerAs', function(done) {
        expect(config.controllerAs).to.equal('vm');
        done();
      });
      
      it('should have correct link', function(done) {
        expect(state.href('login')).to.equal('#/login');
        done();
      });
    });

    describe('Register State:', function() {
      before(function() {
        config = state.get('register');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('register');
        done();
      });

      it('should have correct url', function(done) {
        expect(config.url).to.equal('/register');
        done();
      });

      it('should have correct templateUrl', function(done) {
        expect(config.templateUrl).to.equal('views/auth/auth-register.html');
        done();
      });

      it('should have correct controller', function(done) {
        expect(config.controller).to.equal('registerCtrl');
        done();
      });

      it('should have correct controllerAs', function(done) {
        expect(config.controllerAs).to.equal('vm');
        done();
      });
      
      it('should have correct link', function(done) {
        expect(state.href('register')).to.equal('#/register');
        done();
      });
    });

    describe('Register-from State:', function() {
      before(function() {
        config = state.get('register-from');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('register-from');
        done();
      });

      it('should have correct url', function(done) {
        expect(config.url).to.equal('/register/:from');
        done();
      });

      it('should not have templateUrl', function(done) {
        expect(config.templateUrl).to.be.undefined;
        done();
      });

      it('should have correct controller', function(done) {
        expect(config.controller).to.be.a('function');
        done();
      });

      it('should not have controllerAs', function(done) {
        expect(config.controllerAs).to.be.undefined;
        done();
      });
      
      it('should have correct link', function(done) {
        expect(state.href('register-from')).to.equal('#/register/');
        done();
      });
    });

    describe('Activate State:', function() {
      before(function() {
        config = state.get('activate');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('activate');
        done();
      });

      it('should have correct url', function(done) {
        expect(config.url).to.equal('/activate/:uid/:token');
        done();
      });

      it('should not have templateUrl', function(done) {
        expect(config.templateUrl).to.equal(undefined);
        done();
      });

      it('should have correct controller', function(done) {
        expect(config.controller).to.equal('activateCtrl');
        done();
      });

      it('should have correct controllerAs', function(done) {
        expect(config.controllerAs).to.equal('vm');
        done();
      });
      
      it('should have correct link', function(done) {
        expect(state.href('activate')).to.equal('#/activate//');
        done();
      });
    });

    describe('Register State:', function() {
      before(function() {
        config = state.get('register');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('register');
        done();
      });

      it('should have correct url', function(done) {
        expect(config.url).to.equal('/register');
        done();
      });

      it('should have correct templateUrl', function(done) {
        expect(config.templateUrl).to.equal('views/auth/auth-register.html');
        done();
      });

      it('should have correct controller', function(done) {
        expect(config.controller).to.equal('registerCtrl');
        done();
      });

      it('should have correct controllerAs', function(done) {
        expect(config.controllerAs).to.equal('vm');
        done();
      });
      
      it('should have correct link', function(done) {
        expect(state.href('register')).to.equal('#/register');
        done();
      });
    });

    describe('Register-from State:', function() {
      before(function() {
        config = state.get('register-from');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('register-from');
        done();
      });

      it('should have correct url', function(done) {
        expect(config.url).to.equal('/register/:from');
        done();
      });

      it('should not have templateUrl', function(done) {
        expect(config.templateUrl).to.be.undefined;
        done();
      });

      it('should have correct controller', function(done) {
        expect(config.controller).to.be.an('function');
        done();
      });

      it('should not have controllerAs', function(done) {
        expect(config.controllerAs).to.be.undefined;
        done();
      });
      
      it('should have correct link', function(done) {
        expect(state.href('register-from')).to.equal('#/register/');
        done();
      });
    });

    describe('Activation-msg State:', function() {
      before(function() {
        config = state.get('activation-msg');
      });

      it('should have correct name', function(done) {
        expect(config.name).to.equal('activation-msg');
        done();
      });

      it('should not have url', function(done) {
        expect(config.url).to.be.undefined;
        done();
      });

      it('should have correct templateUrl', function(done) {
        expect(config.templateUrl).to.equal('views/auth/auth-activation.html');
        done();
      });

      it('should not have controller', function(done) {
        expect(config.controller).to.be.undefined;
        done();
      });

      it('should not have controllerAs', function(done) {
        expect(config.controllerAs).to.be.undefined;
        done();
      });
      
      it('should not have link', function(done) {
        expect(state.href('activation-msg')).to.be.null;
        done();
      });
    });

    it("", function() {});
  });
});
