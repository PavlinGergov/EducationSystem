(function() {
  'use strict';

  angular
    .module('educationSystemApp.helpers')
    .directive('positionCard', positionCard);

  function positionCard(profileService, ngDialog) {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/positionCard.html',
      scope: {
        position: '=',
        cities: '=',
        companies: '=',
        courses: '='
      },
      link: function(scope, element, attrs) {
        scope.monthName = function(date) {
          if(date) {
            return profileService.monthName(date);
          }
          else {
            return "";
          }
        };

        element.click(function() {

          scope.position.startMonth = profileService.getMonth(scope.position.start_date);
          scope.position.startYear = profileService.getYear(scope.position.start_date);

          if(scope.position.end_date === null) {
            scope.position.isCurrent = true;
          }
          else {
            scope.position.endMonth = profileService.getMonth(scope.position.end_date);
            scope.position.endYear = profileService.getYear(scope.position.end_date);
            scope.position.isCurrent = false;
          }

          if(scope.position.course === null) {
            scope.position.afterCourse = false;
          }
          else {
            scope.position.afterCourse = true;
          }

          ngDialog.open({
            template: 'views/helpers/position.html',
            data: {
              'cities': scope.cities,
              'companies': scope.companies,
              'courses': scope.courses,
              'position': angular.copy(scope.position)
            },
            className: 'ngdialog-theme-default ngdialog-works-at',
            controller: ['$scope', function($scope) {
              $scope.edit = true;
              $scope.months = profileService.getMonths();
              $scope.cities = $scope.ngDialogData.cities;
              $scope.companies = $scope.ngDialogData.companies;
              $scope.courses = $scope.ngDialogData.courses;
              $scope.position = $scope.ngDialogData.position;

              $scope.$watch('position.isCurrent', function(newValue) {
                if(newValue) {
                  $scope.position.endYear = undefined;
                  $scope.position.endMonth = undefined;
                }
              });

              $scope.inputChanged = function(str) {
                $scope.position.company_name = str;
              };

              $scope.submit = function() {
                profileService.updatePosition($scope.position)
                  .then(function(response) {
                    scope.position = response;
                  });
                $scope.closeThisDialog();
              };
            }]
          });
        });
      }
    };
  }

})();
