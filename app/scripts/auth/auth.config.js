(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .constant('DATA_URL', 'http://localhost:8000/base/api/')
    .config(configure);
  
  function configure($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
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
          console.log(localStorage);
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
            redirectTo: 'profile'
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
            redirectTo: 'profile'
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
            redirectTo: 'profile'
          }
        }
      })
      .state('profile', {
        url:'/profile',
        controller: 'profileCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/auth/auth-profile.html',
        resolve: {
          user: profileData
        },
        data: {
          permissions: {
            only: ['logged'],
            redirectTo: 'login'
          }
        }
      });
    
    function profileData(authService) {
      return authService.profile()
        .then(function(response) {
          return response;
        });
    }
  };
})();
