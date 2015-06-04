(function() {
  'use strict';
  
  angular
    .module('educationSystemApp', [
      'ui.router',
      'educationSystemApp.auth',
      'educationSystemApp.nav',
      'permission'
    ])
    .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    })
    .run(function (Permission, authService) {
      
      Permission.defineRole('anonymous', function (stateParams) {
        if (localStorage.getItem('token') === null) {
          console.log('anonymous');
          return true;
        }
        return false;
      });

      Permission.defineRole('logged', function (stateParams) {
        if (localStorage.getItem('token') !== null) {
          console.log('user');
          return true;
        }
        return false;
      });
    });
})();
