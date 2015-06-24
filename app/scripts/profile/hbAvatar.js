(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .directive('hbAvatar', hbAvatar);

  var setDefaultImage = function (el) {
    el.attr('src', "https://hackbulgaria.com//static/img/no-avatar.png");
  };
  
  function hbAvatar(URL) {
    
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;
    
    function link(scope, el, attr) {
      scope.$watch(function() {
        return attr.ngSrc;
      }, function() {
        var src = attr.ngSrc;
        if(!src) {
          setDefaultImage(el);
        }
        else {
          el.attr('src', URL + src);
        }
      });
      
      el.bind('error', function() {
        setDefaultImage(el);
      });
    }
  };
})();
