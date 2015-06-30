(function() {
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .constant('BASE_URL', 'http://localhost:8000/base/api/')
    .constant('EDUCATION_URL', 'http://localhost:8000/education/api/')
    .constant('URL', 'http://localhost:8000')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'views/auth/auth-register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'profile'
          }
        }
      })
      .state('register-from', {
        url: '/register/:from',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'profile'
          }
        },
        controller: function($stateParams, $state) {
          localStorage.setItem('from', $stateParams.from);
          $state.go('register');
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/auth-login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'check'
          }
        }
      })
      .state('logout', {
        url: '/logout',
        controller: 'logoutCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['logged'],
            redirectTo: 'login'
          }
        }
      })
      .state('activation-msg', {
        templateUrl: 'views/auth/auth-activation.html',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'check'
          }
        }
      })
      .state('activate', {
        url: '/activate/:uid/:token',
        controller: 'activateCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'check'
          }
        }
      })
      .state('resetpassword', {
        url: '/resetpassword',
        templateUrl: 'views/auth/auth-resetpassword.html',
        controller: 'resetPasswordCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'check'
          }
        }
      })
      .state('setnewpassword', {
        url: '/password_reset/:uid/:token',
        templateUrl: 'views/auth/auth-setnewpassword.html',
        controller: 'setNewPasswordCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            only: ['anonymous'],
            redirectTo: 'check'
          }
        }
      });

  };
})();
