(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .factory('applicationService', applicationService);

  function applicationService($http, ENV) {

    // TODO:
    // rename functions

    return {
      getBundle         : getBundle,
      getApplication    : getApplication,
      createApplication : createApplication,
      patchApplication  : patchApplication,
      getTask           : getTask,
      createSolution    : createSolution,
      getSolution       : getSolution,
      updateSolution    : updateSolution
      
    };

    function getBundle() {
      return $http.get(ENV.application + 'bundle/')
        .then(function(response) {
          return response.data;
        }, function(error) {
          // handle error
        });
    };

    function getApplication() {
      // return $http.get(ENV.application + 'application/')
      //   .then(function(response) {
      //     return response.data;
      //   }, function(error) {
      //     // handle error
      //   });
    };

    function createApplication(bundleId) {
      var data = {
        'bundle': bundleId
      };
      return $http.post(ENV.application + 'application/', data)
        .then(function(response) {
          return response.data;
        }, function(error) {
          // handle error
        });
    };

    function patchApplication(data) {
      // return $http.get(ENV.application + 'application/', data)
      //   .then(function(response) {
      //     return response.data;
      //   }, function(error) {
      //     // handle error
      //   });
    };

    function getTask() {
      // return $http.get(ENV.application + 'task/')
      //   .then(function(response) {
      //     return response.data;
      //   }, function(error) {
      //     // handle error
      //   });
    };

    function createSolution(data) {
      // return $http.post(ENV.application + 'task/', data)
      //   .then(function(response) {
      //     return response.data;
      //   }, function(error) {
      //     // handle error
      //   });
    };

    function getSolution() {
      // return $http.get(ENV.application + 'solution/')
      //   .then(function(response) {
      //     return response.data;
      //   }, function(error) {
      //     // handle error
      //   });
    };

    function updateSolution(data) {
      // return $http.patch(ENV.application + 'solution/', data)
      //   .then(function(response) {
      //     return response.data;
      //   }, function(error) {
      //     // handle error
      //   });
    };
  }
})();
