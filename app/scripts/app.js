(function() {
  'use strict';
  
  angular
    .module('educationSystemApp', [
      'ui.router',
      'educationSystemApp.auth',
      'educationSystemApp.profile',
      'permission'
    ])
    .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('login');
      });
    })
    .run(function (Permission, profileService, $rootScope) {
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
        return profileService.getProfileData()
          .then(function(response) {
            if(response.teacher) {
              console.log(response.teacher);
              return true;
            }
            console.log('not teacher');
            return false;
          });
      });

      // Permission.defineRole('student', function (stateParams) {
      //   return profileService.getProfileData()
      //     .then(function(response) {
      //       console.log(response);
      //       //return response.courses !== null;
      //     });
      // });
    });
})();
