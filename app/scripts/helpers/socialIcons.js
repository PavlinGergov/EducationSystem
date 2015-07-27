(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('socialIcons', socialIcons);
  
  function socialIcons() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/socialIcons.html',
      scope: {
        info: '='
      }
    };
  }

})();
