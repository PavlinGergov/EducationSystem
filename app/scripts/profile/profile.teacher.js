(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl(courses, profileService) {
    var vm = this;
    vm.teachedCourses = courses;

    vm.showStudents = function(id) {
      profileService.students(id)
        .then(function(response) {
          console.log(response);
          vm.students =  response;
        });

      profileService.lectures(id)
        .then(function(response) {
          vm.lectures = response.data.map(function(lecture) {
            return lecture.date;
          }).sort();
          vm.lectureDays = profileService.getWeekDays(vm.lectures);
          vm.data = profileService.lectureWeek(vm.lectures, vm.lectureDays);
          console.log(vm.data);
        });
    };

    vm.getCheckins = function (studentId, data) {
      vm.tempData = angular.copy(vm.data);
      profileService.getCheckins(studentId)
        .then(function(checkins){
          console.log(checkins);
          var checkinsDic = {};
          checkins.forEach(function(checkin) {
            checkinsDic[checkin.date] = checkin.id;
          });
          Object.keys(vm.tempData).forEach(function(key) {
            vm.tempData[key].forEach(function(lec) {
              if (typeof lec === 'undefined') {
                return;
              }
              if (typeof checkinsDic[lec.date] !== 'undefined') {
                lec.presence = true;
              }
            });
          });
      });
    };
  }
})();
