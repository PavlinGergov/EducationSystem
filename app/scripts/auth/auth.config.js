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
        templateUrl: 'views/auth/auth-register.html',
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
        templateUrl: 'views/auth/auth-login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        controller: 'logoutCtrl',
        controllerAs: 'vm'
      })
      .state('activation-msg', {
        templateUrl: 'views/auth/auth-activation.html'
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
        templateUrl: 'views/auth/auth-profile.html',
        resolve: {
          user: profileData
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
