(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .constant('DATA_URL', '')
    .config(configure);
  
  function configure($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'views/auth-register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth-login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      });
  };
})();
