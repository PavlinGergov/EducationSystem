(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .directive('hbAvatar', hbAvatar);

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
        if(typeof(src) === 'undefined') {
          setDefaultImage(el);
        }
        else {
          el.attr('src', URL + src);
        }
      });
      
      el.bind('error', function() {
        setDefaultImage(el);
      });

      el.click(function() {
        $('#myModal').modal('show');
      });
    }
  };
})();
