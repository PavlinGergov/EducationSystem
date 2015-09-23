(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .directive('ranking', ranking);

  function ranking(applicationService) {
    return {
      restrict: 'E',
      templateUrl: 'views/application/directives/ranking.html',
      scope: {
        courses: '=data'
      },
      controller: function($scope, $stateParams) {
        var bundleId = $stateParams.bundleId;
        var application = applicationService.getApplicationId($scope.$parent.vm.user.application_set, bundleId);
        
        $scope.sortableOptions = {
          placeholder: "course-placeholder",
          connectWith: ".course-container"
        };
        
        if(application[0].courseselection_set.length > 0) {
          var data = applicationService.ranking($scope.courses, application[0].courseselection_set);
          $scope.courses = data.courses;
          $scope.ranking = data.ranking;
        }
        else {
          $scope.ranking = [];
        }


        $scope.save = function() {
          var rank = $scope.ranking.map(function(course) {
            var courseData = {
              'course': course.id,
              'rank': $scope.ranking.indexOf(course)
            };
            return courseData;
          });
          
          var ranking = {
            'application': application[0].id,
            'ranking': rank
          };

          applicationService.setRanking(ranking);
        };
      }
    };
  }
})();
