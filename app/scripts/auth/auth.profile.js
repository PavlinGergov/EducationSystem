(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(user, navbar, ngDialog, authService, URL) {
    var vm = this;
    vm.menu = navbar.user();
    vm.MEDIA_URL = URL;
    vm.icon = function(status) {
      switch(status) {
      case 'taking':
        return 'fa fa-clock-o';
        break;
      case 'dropped':
        return 'fa fa-times';
        break;
      case 'done':
        return 'fa fa-check';
        break;
      }
    };
    
    vm.user = user;

    vm.social = function() {
      ngDialog.open({
        template: 'views/auth/auth-profile-social-dialog.html',
        data: angular.copy(vm.user.socialLinks),
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.socialLinks = $scope.ngDialogData;
          $scope.editSocial = function(isValid) {
            if(isValid === true) {
              authService.changeSocialLinks($scope.socialLinks);
              vm.user.socialLinks = $scope.socialLinks;
              $scope.closeThisDialog();
            }
          };
        }]
      });
 
    };

    vm.mac = function() {
      ngDialog.open({
        template: 'views/auth/auth-profile-mac-dialog.html',
        data: vm.user.mac,
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.macAddr = $scope.ngDialogData;
          $scope.editMac = function(isValid) {
            if(isValid === true) {
              authService.changeMac($scope.macAddr);
              vm.user.mac = $scope.macAddr;
              $scope.closeThisDialog();
            }
          };
        }]
      });
    };
  }
})();
