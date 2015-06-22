(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl(user, events, ngDialog, profileService, navbar) {
    var vm = this;
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
    vm.events = events;

    if(vm.user.teacher) {
      vm.menu = navbar.teacher();
    }
    else {
      vm.menu = navbar.student();
    }
    
    vm.buyTicket = function(eventId) {
      profileService.buyTicket(eventId)
        .then(function(response) {
          vm.events = [];
          vm.user.ticket_set.length = 1;
        });
    };

    vm.chAvatar = function() {
      ngDialog.open({
        template: 'views/profile/profile-avatar-dialog.html',
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.myImage='';
          $scope.myCroppedImage='';

          console.log(document);
          console.log(document.getElementById('fileInput'));

          var handleFileSelect = function(evt) {
            console.log("smeniha snimkata bacee!")
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
              $scope.$apply(function($scope){
                $scope.myImage = evt.target.result;
              });
            };
            reader.readAsDataURL(file);
          };

          angular.element(document.getElementById('fileInput'))
            .on('change', handleFileSelect);

          // $scope.changeAvatar = function() {
          //     console.log('lil lil lil');
          //   }
          }
        ]
      })
    };

    vm.social = function() {
      ngDialog.open({
        template: 'views/profile/profile-social-dialog.html',
        data: angular.copy(vm.user.socialLinks),
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.socialLinks = $scope.ngDialogData;
          $scope.editSocial = function(isValid) {
            if(isValid === true) {
              profileService.changeSocialLinks($scope.socialLinks);
              vm.user.socialLinks = $scope.socialLinks;
              $scope.closeThisDialog();
            }
          };
        }]
      });

    };

    vm.mac = function() {
      ngDialog.open({
        template: 'views/profile/profile-mac-dialog.html',
        data: vm.user.student.mac,
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.macAddr = $scope.ngDialogData;
          $scope.editMac = function(isValid) {
            if(isValid === true) {
              profileService.changeMac($scope.macAddr);
              vm.user.student.mac = $scope.macAddr;
              $scope.closeThisDialog();
            }
          };
        }]
      });
    };
  }
})();
