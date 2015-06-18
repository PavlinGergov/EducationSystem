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

      Permission.defineRole('teacher', function (stateParams) {
        var deferred = $q.defer();

        return profileService.getProfileData()
          .then(function(response) {
            if(response.teacher) {
              console.log(response);
              console.log('is teacher');
              deferred.resolve();
              //              return true;
            }
            console.log('not teacher');
            console.log($rootScope);
            deferred.reject();
            //            return false;
          }, function() {
            deferred.reject();
          });
        return deferred.promise;
      });
    });
})();
