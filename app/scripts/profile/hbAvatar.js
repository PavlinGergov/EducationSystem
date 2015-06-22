(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .directive('hbAvatar', hbAvatar);

  function hbAvatar() {
    var directive = {
      template: '<img class="img-thumbnail" src={{ avatar }}>',
      link: link
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      console.log(scope);
      
    }
  }
})();
