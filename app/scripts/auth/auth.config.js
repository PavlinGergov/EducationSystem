(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .config(configure);
  
  function configure($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'views/auth-register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      });
  };
})();
