
(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('personalInfo', personalInfo);
  
  function personalInfo(ngDialog) {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/personalInfo.html',
      scope: {
        info: '=',
        cities: '='
      },
      link: function(scope, element, attrs) {
        angular.element(".personal-info").click(function() {
          personalInfoDialog(scope);
        });
      }
    };

    function personalInfoDialog(scope) {
      ngDialog.open({
        template: 'views/profile/profile-social-dialog.html',
        data: {
          'info': angular.copy(scope.info),
          'cities': scope.cities
        },
        showClose: false,
        controller: ['$scope', 'profileService', function($scope, profileService) {
          $scope.personalInfo = $scope.ngDialogData.info;
          $scope.cities = $scope.ngDialogData.cities;

          $scope.editInfo = function() {
            profileService.changePersonalInfo($scope.personalInfo)
              .then(function(response) {
                scope.info = {
                  'github_account': response.github_account,
                  'linkedin_account': response.linkedin_account,
                  'twitter_account': response.twitter_account,
                  'studies_at': response.studies_at,
                  'birth_place': response.birth_place_full,
                  'description': response.description
                };
              });
            $scope.closeThisDialog();
          };
        }]
      });
    };
  };

})();
