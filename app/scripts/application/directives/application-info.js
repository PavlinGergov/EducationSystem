(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .directive('applicationInfo', applicationInfo);

  function applicationInfo() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/application/directives/application-info.html',
      scope: {
        user: '=data'
      },
      link: function(scope, elm, attrs) {
        scope.$watch('user.skype', function(newValue) {
          if(newValue || newValue !== scope.user.skype) {
            ready('#skype');
          }
          else {
            notReady('#skype');
          }
        });
        scope.$watch('user.phone', function(newValue) {
          if(newValue || newValue !== scope.user.phone) {
            ready('#phone');
          }
          else {
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
