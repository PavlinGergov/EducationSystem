(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .factory('authService', authService);
  
  function authService($http, DATA_URL) {
    var service = {
      register: register,
      login: login,
      activate: activate,
      splitName: splitName
    };
    
    return service;

    function register(user, url) {
      console.log();
      //send url
      return $http.post(DATA_URL + 'register/', user)
        .then(function(response) {
          //success
          console.log(response);
        });
    };

    function login(user) {
      return $http.post(DATA_URL + 'login/', user)
        .then(function(response) {
          console.log(response);
          //success
        });
    }

    function activate(data) {
      return $http.post(DATA_URL + 'activate/', data);
    }

    function splitName(name) {
      var fullName = name.split(' ');
      fullName = fullName.filter(Boolean);
      return fullName;
    }
  }
})();
