(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('macAddress', macAddress);
  
  function macAddress(ngDialog, profileService, $parse) {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/macAddress.html',
      scope: {
        mac: '@'
      },
      link: link
    };

    function link(scope, element, attrs) {
      angular.element(".change-mac").click(function() {
        macDialog(scope);
      });
    }

    function macDialog(scope) {
      ngDialog.open({
        template: 'views/profile/profile-mac-dialog.html',
        data: scope.mac,
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.macAddr = $scope.ngDialogData;
          $scope.editMac = function(isFormValid) {
            if(isFormValid) {
              profileService.changeMac($scope.macAddr);
              scope.mac = $scope.macAddr;
              $scope.closeThisDialog();
            }
          };
        }]
      });
      
    };
  }

})();
