(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')

    .directive("fileread", [function () {
      return {
        scope: {
          fileread: "="
        },
        link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.fileread = loadEvent.target.result;
              });
            };
            reader.readAsDataURL(changeEvent.target.files[0]);
          });
        }
      }
    }])
    .controller('profileCtrl', profileCtrl);

    //TODO:Iznasqne na direktivata v otdelen fail
  function profileCtrl(user, events, ngDialog, profileService, URL, Upload, EDUCATION_URL, navbar) {

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
    vm.obj = {
      'src': '',
      'selection': [0, 0, 300, 300, 0, 0],
      'thumbnail': false
    };

    if(vm.user.teacher) {
      vm.menu = navbar.teacher();
    }
    else {
      vm.menu = navbar.student();
    }

    vm.uploadAvatar = function(file) {
      Upload.upload({
        url: EDUCATION_URL +'base-user-update/',
        method: 'PATCH',
        fields: {'selection': vm.obj.selection},
        file: file,
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
      });
    };

    vm.buyTicket = function(eventId) {
      profileService.buyTicket(eventId)
        .then(function(response) {
          vm.events = [];
          vm.user.ticket_set.length = 1;
        });
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
