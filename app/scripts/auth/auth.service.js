(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .factory('authService', authService);
  
  function authService($http, DATA_URL) {
    var service = {
      register: register,
      login: login,
      splitName: splitName
    };
    
    return service;

    function register(user, url) {
      console.log(url);
      //send url
      return $http.post(DATA_URL, user)
        .then(function() {
          //success
        });
    };

    function login(user) {
      return $http.post(DATA_URL, user)
        .then(function() {
          //success
        });
    }

    function splitName(name) {
      var fullName = name.split(' ');
      fullName = fullName.filter(Boolean);
      return fullName;
    }
  }
})();
