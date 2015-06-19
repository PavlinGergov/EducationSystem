(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl(user, profileService) {
    var vm = this;
    vm.user = user;
    vm.teached_courses = vm.user.teacher.teached_courses;

    vm.showStudents = function(id) {
      vm.current_id = id;
      profileService.students(id)
        .then(function(response) {
          console.log(response);
          vm.students =  response;
        });

      profileService.lectures(id)
        .then(function(response) {
          vm.lectures = response;
          console.log(vm.lectures);
          vm.lectureDays = profileService.getWeekDays(vm.lectures);
          //console.log(vm.lectureDays);
          vm.data = profileService.lectureWeek(vm.lectures, vm.lectureDays);
          //console.log(vm.data);
        });
    };

    vm.getCheckins = function (studentId) {
      vm.tempData = angular.copy(vm.data);
      profileService.getCheckins(studentId, vm.current_id)
        .then(function(checkins){
          console.log(checkins);

          checkins.map(function(checkin) {
            var weekNumber = profileService.getNumberOfWeek(checkin.date);
            vm.tempData[weekNumber].map(function(lec) {
              console.log(checkin.date);
              if(lec.date == checkin.date) {
                lec.presence = true;
              }
            });
          });
          // var checkinsDic = {};
          // checkins.forEach(function(checkin) {
          //   checkinsDic[checkin.date] = checkin.id;
          // });
          // Object.keys(vm.tempData).forEach(function(key) {
          //   vm.tempData[key].forEach(function(lec) {
          //console.log(key); key = week big number
          
          //console.log(checkinsDic[lec.date]);
          // if (lec === ' ') {
          //   return;
          // }
          // if (checkinsDic[lec.date] !== ' ') {
          //   lec.presence = true;
          // }
          //});
          //});
        });
    };
  }
})();
