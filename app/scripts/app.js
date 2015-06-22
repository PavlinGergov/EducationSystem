(function() {
  'use strict';

  angular
    .module('educationSystemApp', [
      'ui.router',
      'educationSystemApp.auth',
      'educationSystemApp.profile',
      'educationSystemApp.nav',
      'permission',
      'ngImgCrop'
    ])
    .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('check');
      });
    })
    .run(function (Permission, profileService, $rootScope, $q) {
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

      Permission.defineRole('teacher', function () {
        if(localStorage.getItem('token')) {
          return profileService.getProfileData()
            .then(function(response) {
              if(response.teacher) {
                return true;
              }
              return false;
            });
        }
        return false;
      });
    });
})();
