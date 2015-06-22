(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .directive('hbAvatar', hbAvatar);

  function hbAvatar() {
    var directive = {
      link: postLink
    };
    return directive;

    function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.hbAvatar);
      });
    }
  }
})();
