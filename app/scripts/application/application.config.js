(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/application',
        templateUrl: 'views/application/application.html',
        controller: 'applicationCtrl',
        controllerAs: 'vm',
        resolve: {
          bundles: bundlesPrep,
          user: userPrep
        }
      });

    function bundlesPrep(applicationService) {
      return applicationService.getBundle()
        .then(function(response) {
          return response;
        });
    }

    function userPrep(profileService) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        });
    }
  }
})();
