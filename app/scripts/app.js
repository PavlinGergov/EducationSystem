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
      'permission',
      'ngJcrop',
      'ngFileUpload',
      'angucomplete-alt'
    ])
    .config(function ($urlRouterProvider, ngJcropConfigProvider) {
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
              if(!!response.teacher && !response.student) {
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
              if(!!response.teacher && !!response.student) {
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
              if(!!response.student && !response.teacher) {
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
              if(!!response.student && !!response.teacher) {
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
