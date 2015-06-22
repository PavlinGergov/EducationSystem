(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl(user, profileService, URL) {
    var vm = this;

    vm.showStudents = function(id) {
      vm.currentId = id;
      profileService.students(id)
        .then(function(response) {
          console.log(response);
          vm.ca =  response;
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
      profileService.getCheckins(studentId, vm.currentId)
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
      vm.currentStudent = vm.ca.filter(function(student) {
        return student.user.id === studentId;
      })[0];
    };

    activate();

    function activate() {
      vm.url = URL;
      vm.user = user;
      console.log(user);
      vm.teachedCourses = vm.user.teacher.teached_courses;
      // TODO:
      // sort teachedCourses
      vm.showStudents(vm.teachedCourses[0].id);
    }
  }
})();
