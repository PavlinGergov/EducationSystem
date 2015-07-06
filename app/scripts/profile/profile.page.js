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
  function profileCtrl(user, events, ngDialog, profileService, URL, Upload, BASE_URL, navbar, studentService) {

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
    activate();
    
    vm.user = user;
    vm.events = events;
    vm.obj = {
      'src': '',
      'selection': [0, 0, 300, 300, 0, 0],
      'thumbnail': false
    };

    if(vm.user.teacher) {
      vm.courseId = vm.user.teacher.teached_courses[0].id;
      vm.menu = navbar.teacher(vm.courseId);
    }
    else {
      vm.courseId = studentService.getCourses(vm.user)[0].course.id;
      vm.menu = navbar.student(vm.courseId);
    }

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

    function activate() {
      
    }
  }
})();
