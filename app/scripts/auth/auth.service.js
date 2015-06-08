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
      splitName: splitName,
      logout: logout,
      profile: profile,
      userData: userData
    };

    return service;

    function logout() {
      //send delete request
    }
    function register(user) {
      //send url
      return $http.post(DATA_URL + 'register/', user)
        .then(function(response) {
          return response;
        });
    };

    function login(user) {
      return $http.post(DATA_URL + 'login/', user)
        .then(function(response) {
          return response;
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

    function profile() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(DATA_URL + 'me/', options)
        .then(function(response) {
          return userData(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function userData(user) {
      var result = {
        'name': user.first_name + " " + user.last_name,
        'email': user.email,
//      'avatar': user.avatar,
        'avatar': 'https://s-media-cache-ak0.pinimg.com/736x/10/61/61/1061614ee7f3a3e64be576c2cc04d13e.jpg',
        'mac': user.student.mac,
        'social_links': {
          'github': user.student.github_account,
          'linkedin': user.student.linkedin_account,
          'twitter': user.student.twitter_account
        },
        'courses': user.student.courses,
        'challenges': user.competitor.teammembership_set
      };
      return result;
    }
  }
})();
