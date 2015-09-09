(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('apply', {
        url: '/apply',
        templateUrl: 'views/application/apply.html',
        controller: 'applyCtrl',
        controllerAs: 'vm',
        resolve: {
          bundles: bundlesPrep,
          user: userPrep
        }
      })
      .state('application', {
        url: '/application',
        templateUrl: 'views/application/application.html',
        controller: 'applicationCtrl',
        controllerAs: 'vm'
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
