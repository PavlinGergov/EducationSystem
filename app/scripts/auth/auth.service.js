(function() {
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .factory('authService', authService);

  function authService($http, ENV, $q) {
    var service = {
      register: register,
      login: login,
      activate: activate,
      splitName: splitName,
      logout: logout,
      resetPassword: resetPassword,
      setNewPassword: setNewPassword
    };

    return service;

    function toast(type, css, msg) {
      toastr.options.positionClass = css;
      toastr[type](msg);
    }

    function errorsNotification(err) {
      Object.keys(err.data).map(function(key) {
        err.data[key].map(function(msg) {
          toast('error', 'toast-top-right', msg);
        });
      });
    }

    function resetPassword(data) {
      return $http.post(ENV.base + 'password-reset/', data)
        .then(function() {
          var msg = 'Изпратихме ти email с линк, от който можеш да промениш паролата си.';
          toast('success', 'toast-top-right', msg);
        });
    }

    function setNewPassword(data) {
      return $http.post(ENV.base + 'password-reset-confirm/', data)
        .then(function(response) {
          var msg = 'Успешно промени паролата си.';
          toast('success', 'toast-top-right', msg);
        })
        .catch(function(error) {
          errorsNotification(error);
        });
    }
    
    function logout() {
      //send delete request
    }
    
    function register(user) {
      return $http.post(ENV.base + 'register/', user)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          errorsNotification(error);
          return $q.reject(error);
        });
          
    };

    function login(user) {
      return $http.post(ENV.base + 'login/', user)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          errorsNotification(error);
          return $q.reject(error);
        });
    }

    function activate(data) {
      return $http.post(ENV.base + 'activate/', data);
    }

    function splitName(name) {
      var fullName = name.split(' ');
      fullName = fullName.filter(Boolean);
      return fullName;
    }
  }
})();
