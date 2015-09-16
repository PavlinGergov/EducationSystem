(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .directive('bundle', bundle);

  function bundle() {
    // usage:
    // <bundle data="bundleObj">
    //   # content #
    //   # <bundle-courses></bundle-courses>
    // </bundle>
    
    return {
      restrict: 'E',
      scope: {
        bundle: '=data'
      },
      transclude: true,
      replace: true,
      templateUrl: 'views/application/directives/bundle.html',
      controller: function($scope, applicationService, $state) {
        this.getCourses = function() {
          return $scope.bundle.course_set;
        };

        $scope.applyForBundle = function(){
          applicationService.createApplication($scope.bundle.id)
            .then(function(response) {
              $state.go('application', { bundleId: $scope.bundle.id});
            });
        };
      }
    };
  }
})();
