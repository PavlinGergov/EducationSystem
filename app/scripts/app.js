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
    .run(function (Permission, authService, $rootScope) {
      Permission.defineRole('anonymous', function (stateParams) {
        if (localStorage.getItem('token') === null) {
          return true;
        }
        return false;
      });

      Permission.defineRole('logged', function (stateParams) {
        if (localStorage.getItem('token') !== null) {
          return true;
        }
        return false;
      });

      Permission.defineRole('teacher', function (stateParams) {
        return authService.profile()
          .then(function(response) {
            console.log(response.teacher !== null);
            return response.teacher !== null; 
          });
      });

      Permission.defineRole('student', function (stateParams) {
        return authService.profile()
          .then(function(response) {
            return response.courses !== null;
          });
      });
    });
})();
