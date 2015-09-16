(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .directive('applicationInfo', applicationInfo);

  function applicationInfo(applicationService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/application/directives/application-info.html',
      scope: {
        user: '=data'
      },
      link: function(scope, elm, attrs) {
        scope.$watch('user.skype', function(newValue, oldValue) {
          if(oldValue) {
            ready('#skype');
          }
          else {
            notReady('#skype');
          }
          
          if(newValue && newValue !== oldValue) {
            applicationService.changeSkype(newValue)
              .then(function(response) {
                scope.user.skype = response.skype;
              });
            ready('#skype');
          }
          else if(newValue === '') {
            applicationService.changeSkype(newValue)
              .then(function(response) {
                scope.user.skype = response.skype;
              });
            notReady('#skype');
          }
        });
        
        scope.$watch('user.phone', function(newValue, oldValue) {
          if(oldValue) {
            ready('#phone');
          }
          else {
            notReady('#phone');
          }
          
          if(newValue && newValue !== oldValue) {
            applicationService.changePhone(newValue)
              .then(function(response) {
                scope.user.phone = response.phone;
              });
            ready('#phone');
          }
          else if(newValue === '') {
            applicationService.changePhone(newValue)
              .then(function(response) {
                scope.user.phone = response.phone;
              });
            notReady('#phone');
          }
        });
        
        var ready = function(idName) {
          var i = elm.find(idName);
          i.removeClass();
          i.addClass('fa fa-check fa-2');
        };

        var notReady = function(idName) {
          var i = elm.find(idName);
          i.removeClass();
          i.addClass('fa fa-times fa-2');
        };
      }
    };
  }
})();
