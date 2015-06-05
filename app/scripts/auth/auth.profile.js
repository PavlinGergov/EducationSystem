(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(user, navbar, ngDialog) {
    var vm = this;
    vm.menu = navbar.user();
    vm.containerId = 'profile-container';

    vm.icon = function(text) {
      if(text === 'done') {
        return ['fa fa-check', 'tr-done'];
      } else if (text == 'dropped') {
        return ['fa fa-times', 'tr-dropped'];
      } else if (text == 'taking'){
        return ['fa fa-clock-o', 'tr-taking'];
      }
      else {
        return ['', ''];
      }
    };

    vm.user = user;
    console.log(vm.user);

    vm.social = function() {
      var data = vm.user.social_links;
      ngDialog.open({
        template: 'views/auth/auth-profile-social-dialog.html',
        data: data,
        showClose: false,
        controller: function($scope) {
          console.log($scope);
          $scope.social_links = $scope.ngDialogData;
          console.log($scope.social_links);
          $scope.editSocial = function() {
            //send request
            vm.user.social_links = $scope.social_links;
            $scope.closeThisDialog();
          };
        }
      });
    };

    vm.mac = function() {
      var data = vm.user.mac;
      ngDialog.open({
        template: 'views/auth/auth-profile-mac-dialog.html',
        data: data,
        showClose: false,
        controller: function($scope) {
          console.log($scope);
          $scope.mac_address = $scope.ngDialogData;
          $scope.editMac = function() {
            //send request
            vm.user.mac = $scope.mac_address;
            $scope.closeThisDialog();
          };
        }
      });
    };
  }
})();
