
(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('personalInfo', personalInfo);
  
  function personalInfo(ngDialog, profileService) {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/personalInfo.html',
      scope: {
        info: '='
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
        data: angular.copy(scope.info),
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.personalInfo = $scope.ngDialogData;
          $scope.editInfo = function(isValid) {
            if(isValid === true) {
              profileService.changePersonalInfo($scope.personalInfo);
              scope.info = $scope.personalInfo;
              $scope.closeThisDialog();
            }
          };
        }]
      });
    };
  };

})();
