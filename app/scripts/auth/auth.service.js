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
      logout: logout,
      splitName: splitName
    };
    
    return service;

    function logout() {
      //send delete request
    }
    function register(user, url) {
      //send url
      return $http.post(DATA_URL + 'register/', user)
        .then(function(response) {
          return response;
        });
    };

    function login(user) {
      return $http.post(DATA_URL + 'login/', user)
        .then(function(response) {
          return response.data;
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
