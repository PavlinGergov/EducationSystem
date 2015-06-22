(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .directive('hbAvatar', hbAvatar);

<<<<<<< HEAD
  var setDefaultImage = function (el) {
    el.attr('src', "/images/no-avatar.png");
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
=======
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
>>>>>>> fix checkins
})();
