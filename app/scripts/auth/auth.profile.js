(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(user, navbar, ngDialog, authService) {
    var vm = this;
    vm.menu = navbar.user();
    vm.containerId = 'profile-container';
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
    vm.bGithub = user.social_links.github_account;
    vm.bTwitter = user.social_links.twitter_account;
    vm.bLinkedin = user.social_links.twitter_account;

    console.log(vm.bGithub);
    var sl = angular.copy(vm.user.social_links);
    vm.social = function() {
      var data = sl;
      ngDialog.open({
        template: 'views/auth/auth-profile-social-dialog.html',
        data: data,
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.social_links = $scope.ngDialogData;
          $scope.editSocial = function(isValid) {
            if(isValid === true) {
              authService.changeSocialLinks($scope.social_links);
              vm.user.social_links = $scope.social_links;
              $scope.closeThisDialog();
            }
          };
        }]
      });
    };

    vm.mac = function() {
      var data = vm.user.mac;
      ngDialog.open({
        template: 'views/auth/auth-profile-mac-dialog.html',
        data: data,
        showClose: false,
        controller: function($scope) {
          $scope.mac_address = $scope.ngDialogData;
          $scope.editMac = function(isValid) {
            if(isValid === true) {
              console.log(isValid);
              var mac = authService.transformMac($scope.mac_address);
              vm.user.mac = mac;
              authService.changeMac(mac);
              $scope.closeThisDialog();
            }
          };
        }
      });
    };
  }
})();
