(function() {
  'use strict';

  angular
    .module('educationSystemApp', [
      'ui.router',
      'educationSystemApp.auth',
      'educationSystemApp.profile',
      'educationSystemApp.nav',
      'educationSystemApp.student',
      'educationSystemApp.teacher',
      'educationSystemApp.config',
      'educationSystemApp.helpers',
      'educationSystemApp.application',
      'permission',
      'ngJcrop',
      'ngFileUpload',
      'angucomplete-alt',
      'angular.filter'
    ])
    .config(function ($urlRouterProvider, ngJcropConfigProvider, $httpProvider) {

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

      $httpProvider.interceptors.push(function($q, $injector) {
        return {
          'request': function(config) {
            if(localStorage.getItem('token')) {
              config.headers['Authorization'] = 'Token ' + localStorage.getItem('token');
            }
            return config;
          },
          'responseError': function(response) {
            if(response.status === 401) {
              localStorage.removeItem('token');
              var $state = $injector.get("$state");
              $state.go('login');
            }
            return $q.reject(response);
          }
        };
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
        if(localStorage.getItem('token')) {
          profileService.getMe()
            .then(function(response) {
              if(response.isTeacher && !response.isStudent) {
                deferred.resolve();
              }
              deferred.reject();
            }, function() {
              deferred.reject();
            });
        }
        return deferred.promise;
      });

      Permission.defineRole('studentAndTeacher', function (stateParams) {
        var deferred = $q.defer();
        if(localStorage.getItem('token')) {
          profileService.getMe()
            .then(function(response) {
              if(response.isTeacher && response.isStudent) {
                deferred.resolve();
              }
              deferred.reject();
            }, function() {
              deferred.reject();
            });
        }
        return deferred.promise;
      });

      Permission.defineRole('student', function (stateParams) {
        var deferred = $q.defer();
        if(localStorage.getItem('token')) {
          profileService.getMe()
            .then(function(response) {
              if(response.isStudent && !response.isTeacher) {
                deferred.resolve();
              }
              deferred.reject();
            }, function() {
              deferred.reject();
            });
        }
        return deferred.promise;
      });

      Permission.defineRole('user', function (stateParams) {
        var deferred = $q.defer();
        if(localStorage.getItem('token')) {
          profileService.getMe()
            .then(function(response) {
              if(!response.isStudent && !response.isTeacher) {
                deferred.resolve();
              }
              deferred.reject();
            }, function() {
              deferred.reject();
            });
        }
        return deferred.promise;
      });
    });
})();
