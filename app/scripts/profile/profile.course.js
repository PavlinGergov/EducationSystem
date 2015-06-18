(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('courseCtrl', courseCtrl);

  function courseCtrl(profileService, students, lectures) {
    var vm = this;
    vm.students = students;
    vm.lectures = lectures;
    vm.lectureDays = profileService.getWeekDays(vm.lectures);
    vm.data = profileService.lectureWeek(vm.lectures, vm.lectureDays);
    console.log(vm.data);

    vm.getCheckins = function(studentId, data) {
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


    activate();

    function activate() {
    }
  }
}) ();
