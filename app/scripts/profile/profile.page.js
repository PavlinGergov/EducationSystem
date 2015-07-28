(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl(user, events, cities, companies, ngDialog, profileService, URL, Upload, BASE_URL, navbar, studentService, teacherService, $filter) {
    //TODO: FIX THIS
    var vm = this;
   vm.companies = companies;
   vm.cities = cities;
    vm.months = profileService.getMonths();
    // vm.icon = function(status) {
    //   switch(status) {
    //   case 'taking':
    //     return 'fa fa-clock-o';
    //     break;
    //   case 'dropped':
    //     return 'fa fa-times';
    //     break;
    //   case 'done':
    //     return 'fa fa-check';
    //     break;
    //   }
    // };
    activate();
    
    vm.user = user;
    if(vm.user.isStudent && vm.user.student.courseassignment_set.length > 0) {
      vm.courses = vm.user.student.courseassignment_set;
    }

    if(vm.user.isStudent && vm.user.student.workingat_set) {
      vm.user.student.workingat_set = $filter('orderBy')(vm.user.student.workingat_set, 'start_date', true);
    }
    
    // vm.events = events;
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
    
    // vm.buyTicket = function(eventId) {
    //   profileService.buyTicket(eventId)
    //     .then(function(response) {
    //       vm.events = [];
    //       vm.user.ticket_set.length = 1;
    //     });
    // };

 

    // vm.editPosition = function(positionId) {
    //   ngDialog.open({
    //     template: 'views/profile/profile-edit-position.html',
    //     className: 'ngdialog-theme-default ngdialog-works-at',
    //     data: angular.copy(vm.user.student.workingat_set),
    //     controller: ['$scope', function($scope) {
          
    //       $scope.cities = vm.cities;
    //       $scope.companies = vm.companies;
    //       $scope.months = vm.months;
    //       $scope.courses = vm.courses;
    //       $scope.currentPosition = $scope.ngDialogData.filter(function(position) {
    //         return position.id === positionId;
    //       })[0];
    //       $scope.currentPosition.afterCourse = false;
          
    //       $scope.$watch('currentPosition.start_date', function (newValue) {
    //         $scope.currentPosition.startMonth = $filter('date')(newValue, 'MM');
    //         $scope.currentPosition.startYear = parseInt($filter('date')(newValue, 'yyyy'));
    //       });
    //       $scope.$watch('currentPosition.end_date', function (newValue) {
    //         if(!newValue) {
    //           $scope.currentPosition.isCurrent = true;
    //         }
    //         else {
    //           $scope.currentPosition.endMonth = $filter('date')(newValue, 'MM');
    //         $scope.currentPosition.endYear = parseInt($filter('date')(newValue, 'yyyy'));
    //         }
    //       });
          
    //       $scope.$watch('currentPosition.afterCourse', function (newValue) {
    //         if(newValue === false) {
    //           $scope.currentPosition.course = '';
    //         }
    //       });
    //       if(typeof $scope.currentPosition.course === 'number') {
    //         $scope.currentPosition.afterCourse = true;
    //       }
    //       $scope.$watchGroup(['currentPosition.startMonth', 'currentPosition.startYear'], function(newValues, oldValues, scope) {
    //         $scope.currentPosition.start_date = newValues[1].toString() + '-' + newValues[0] + '-01';
    //       });
          
    //       $scope.$watchGroup(['currentPosition.endMonth', 'currentPosition.endYear', 'currentPosition.isCurrent'], function(newValues, oldValues, scope) {
    //         if($scope.currentPosition.isCurrent === false) {
    //           $scope.currentPosition.end_date = newValues[1].toString() + '-' + newValues[0] + '-01';
    //         }
    //         else if($scope.currentPosition.isCurrent === true){
    //           $scope.currentPosition.endMonth = null;
    //           $scope.currentPosition.endYear = null;
    //           $scope.currentPosition.end_date = null;
    //         }
    //       });
        
    //       $scope.inputChanged = function(str) {
    //         $scope.currentPosition.company_name = str;
    //       };

         
    //       $scope.editWork = function() {
    //         profileService.updatePosition($scope.currentPosition);
    //         if(typeof $scope.currentPosition.location === 'object') {
    //           $scope.currentPosition.location_full = $scope.currentPosition.location.originalObject;
    //         }

    //         vm.user.student.workingat_set = $scope.ngDialogData;
    //         $scope.closeThisDialog();
    //       };
    //     }]
    //   });

    // };

   
    function activate() {
      
    }
  }
})();
