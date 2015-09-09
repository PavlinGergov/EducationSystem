(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .directive('bundleCourses', bundleCourses);

  function bundleCourses() {

    // usage: inside <bundle></bundle>
    // <ul> or <ol>
    //   <bundle-courses></bundle-courses>
    // </ul> or </ol>
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/application/directives/bundle-courses.html',
      require: '^bundle',
      link: function(scope, element, attrs, bundleCtrl) {
        scope.courses = bundleCtrl.getCourses();
      }
    };
  }
})();
