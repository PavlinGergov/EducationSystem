(function() {
  'use strict';

  angular
    .module('educationSystemApp', [
      'ui.router',
      'educationSystemApp.auth',
      'educationSystemApp.profile',
      'educationSystemApp.nav',
      'permission',
      'ngJcrop',
      'ngFileUpload'
    ])
    .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('check');
      });
      ngJcropConfigProvider.setJcropConfig({
        bgColor: 'black',
        bgOpacity: .4,
        aspectRatio: 1,
        maxWidth: 300
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
