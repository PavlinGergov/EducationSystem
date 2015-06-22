(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl(user, profileService, URL) {
    var vm = this;

    vm.showStudents = function(id) {
      vm.current_id = id;
      profileService.students(id)
        .then(function(response) {
          vm.students =  response;
        });

      profileService.lectures(id)
        .then(function(response) {
          vm.lectures = response;
          vm.lectureDays = profileService.getWeekDays(vm.lectures);
          vm.data = profileService.lectureWeek(vm.lectures, vm.lectureDays);
        });
    };

    vm.getCheckins = function (studentId) {
      vm.tempData = angular.copy(vm.data);
      profileService.getCheckins(studentId, vm.current_id)
        .then(function(checkins){
          checkins.map(function(checkin) {
            var weekNumber = profileService.getNumberOfWeek(checkin.date);
            vm.tempData[weekNumber].map(function(lec) {
              if(lec.date == checkin.date) {
                lec.presence = true;
              }
            });
          });
        });
    };

    activate();

    function activate() {
      vm.url = URL;
      vm.user = user;
      vm.teachedCourses = vm.user.teacher.teached_courses;
      // TODO:
      // sort teachedCourses
      vm.showStudents(vm.teachedCourses[0].id);
    }
  }
})();
