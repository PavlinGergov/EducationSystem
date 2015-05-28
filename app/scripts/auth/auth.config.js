(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .constant('DATA_URL', 'http://localhost:8000/base/api/')
    .config(configure);
  
  function configure($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/auth-register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .state('register-from', {
        url: '/register/:from',
        controller: function($stateParams, $state) {
          localStorage.setItem('from', $stateParams.from);
          console.log(localStorage);
          $state.go('register');
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth-login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .state('activation-msg', {
        templateUrl: 'views/auth-activation.html'
      })
      .state('activate', {
        url: '/activate/:uid/:token',
        controller: 'activateCtrl',
        controllerAs: 'vm'
      })
      .state('profile', {
        url:'/profile',
        controller: 'profileCtrl',
        controllerAs: 'vm',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        }
      });
  };
})();
