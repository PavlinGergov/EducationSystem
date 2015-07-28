(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('addPosition', addPosition)
    .directive('editPosition', editPosition);
  
  function addPosition(profileService, ngDialog, $parse) {
    return {
      restrict: 'A',
      scope: {
        cities: '=',
        companies: '=',
        courses: '=',
        set: '='
      },
      link: function(scope, element, attrs) {
        console.log(scope.set);
        element.click(function() {
          ngDialog.open({
            template: 'views/helpers/position.html',
            data: {
              'cities': scope.cities,
              'companies': scope.companies,
              'courses': scope.courses
            },
            className: 'ngdialog-theme-default ngdialog-works-at',
            controller: ['$scope', function($scope) {
              $scope.months = profileService.getMonths();
              $scope.cities = $scope.ngDialogData.cities;
              $scope.companies = $scope.ngDialogData.companies;
              $scope.courses = $scope.ngDialogData.courses;
              $scope.position = {
                'isCurrent': true,
                'came_working': false,
                'afterCourse': false
              };
              
              $scope.inputChanged = function(str) {
                $scope.position.company_name = str;
              };

              $scope.submit = function() {
                profileService.addPosition($scope.position)
                  .then(function(response) {
                    scope.set.push(response);
                  });
                $scope.closeThisDialog();
              };
            }]
          });
        });
        
      }
    };
  }

  function editPosition() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.click(function() {
          console.log('edit');
        });
      }
    };
  };

})();
