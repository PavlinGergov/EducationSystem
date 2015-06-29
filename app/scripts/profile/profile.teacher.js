(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl(user, profileService, URL, navbar) {
    var vm = this;

    vm.menu = navbar.teacher();

    vm.showStudents = function(courseId) {
      vm.currentId = courseId;
      profileService.students(courseId)
        .then(function(response) {
          vm.ca =  response;
        });

      profileService.lectures(courseId)
        .then(function(response) {
          vm.lectures = response;
          vm.lectureDays = profileService.getWeekDays(vm.lectures);
          vm.data = profileService.lectureWeek(vm.lectures, vm.lectureDays);
        });
    };

    vm.addNote = function(caId) {
      var data = {
        'text': vm.newNote,
        'ca_id': caId
      };
      profileService.addNote(data)
        .success(function(response) {
          vm.newNote = '';
          data.author = {
            'first_name': vm.user.first_name,
            'last_name': vm.user.last_name
          };

          vm.courseAssignment.studentnote_set.push(data);
        });
    };

    vm.getCheckins = function (studentId) {
      // TODO:
      // fix tempData[weekNumber] undefined (out of range)
      var lectureAttendance = 0;
      vm.tempData = angular.copy(vm.data);
      profileService.getCheckins(studentId, vm.currentId)
        .then(function(checkins){
          checkins.map(function(checkin) {
            var weekNumber = profileService.getNumberOfWeek(checkin.date);
            if(vm.tempData[weekNumber]) {
              vm.tempData[weekNumber].map(function(lec) {
                if(lec.date == checkin.date) {
                  lec.presence = true;
                  lectureAttendance += 1;
                }
              });
            }
          });
        })
          .then(function() {
            vm.presencePercentage = Math.round((lectureAttendance / vm.lectures.length) * 100);
            if (vm.presencePercentage < 50) {
              vm.colorCoding = 'red';
            }
            else if(vm.presencePercentage >= 50 && vm.presencePercentage <= 80) {
              vm.colorCoding = 'yellow';
            }
            else {
              vm.colorCoding = 'green';
            }
          });

      vm.courseAssignment = vm.ca.filter(function(student) {
        return student.user.id === studentId;
      })[0];
    };

    activate();

    function activate() {
      vm.url = URL;
      vm.user = user;
      vm.teachedCourses = vm.user.teacher.teached_courses.reverse();
      vm.showStudents(vm.teachedCourses[0].id);
    }
  }

})();
