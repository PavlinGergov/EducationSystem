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
      };
    }])
    .controller('profileCtrl', profileCtrl);

    //TODO:Iznasqne na direktivata v otdelen fail
  function profileCtrl(user, events, companies, cities, ngDialog, profileService, URL, Upload, BASE_URL, navbar, studentService, teacherService) {

    var vm = this;
    vm.companies = companies;
    vm.cities = cities;
    vm.months = profileService.getMonths();
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
    activate();
    
    vm.user = user;
    if(vm.user.student.workingat_set.length > 0) {
      vm.lastPosition = vm.user.student.workingat_set[vm.user.student.workingat_set.length - 1];
      console.log(vm.lastPosition);
      vm.lastPosition = {
        company: {
          name: 'Hack Bulgaria'
        },
        title: 'Junior Software Developer',
        start_date: '2015-03-01',
        end_date: null,
        location: {
          name: 'Sofia'
        }
      };
    }
    
    vm.events = events;
    vm.obj = {
      'src': '',
      'selection': [0, 0, 300, 300, 0, 0],
      'thumbnail': false
    };

    vm.menu = navbar.getMenu(vm.user);
    vm.uploadAvatar = function(file) {
      Upload.upload({
        url: BASE_URL +'base-user-update/',
        method: 'PATCH',
        fields: {'selection': vm.obj.selection},
        file: file,
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
      })
        .success(function(response) {
          $('#myModal').modal('hide');
          var msg = 'Успешно промени аватара си!';
          profileService.notification('success', 'toast-top-right', msg);
          vm.user.avatar = response;
        });
    };
    
    vm.buyTicket = function(eventId) {
      profileService.buyTicket(eventId)
        .then(function(response) {
          vm.events = [];
          vm.user.ticket_set.length = 1;
        });
    };

    vm.info = function() {
      ngDialog.open({
        template: 'views/profile/profile-social-dialog.html',
        data: angular.copy(vm.user.personalInfo),
        showClose: false,
        controller: ['$scope', function($scope) {

          $scope.personalInfo = $scope.ngDialogData;
          $scope.editInfo = function(isValid) {
            if(isValid === true) {
              profileService.changePersonalInfo($scope.personalInfo);
              vm.user.personalInfo = $scope.personalInfo;
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

    vm.worksAt = {};
    vm.updateWork = function() {
      vm.worksAt.city = vm.worksAt.city.originalObject;
      profileService.addPosition(vm.worksAt)
        .then(function(response) {
          vm.lastPosition = [vm.worksAt];
        });
    };
    
    function activate() {
      
    }
  }
})();
