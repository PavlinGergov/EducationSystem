(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .controller('studentStatisticsCtrl', studentStatisticsCtrl);

  function studentStatisticsCtrl($state,user, courseAssignments, tableData, studentService, profileService, teacherService) {
    var vm = this;

    activate();
    vm.state = $state;
    // console.log($state.includes('teachersDashboard.students.statistics', {studentId: 308}));
    var emptyTable = tableData.data;
    vm.weekdays = tableData.weekdays;
    vm.currentCA = courseAssignments.filter(function(ca) {
      return ca.user.id == $state.params.studentId;
    })[0];

    vm.addNote = function(caId) {
      var data = {
        'text': vm.newNote,
        'ca_id': caId
      };
      profileService.addNote(data)
        .success(function(response) {
          vm.newNote = '';
          data.author = {
            'first_name': user.first_name,
            'last_name': user.last_name
          };

          vm.currentCA.studentnote_set.push(data);
        });
    };

    vm.dropStudent = function(cdId) {
      // console.log("viknaha me");
      var data = {
        'ca_id': cdId.id,
        'is_attending': !cdId.is_attending
      };
      teacherService.dropStudent(data)
        .then(function(){
          vm.currentCA.is_attending = !cdId.is_attending;
        });
    };

    function activate() {

      vm.studentId = $state.params.studentId;
      vm.courseId = $state.params.courseId;
      studentService.getStudentCheckins(vm.studentId, vm.courseId)
        .then(function(checkins) {
          vm.presence = studentService.getPresenceTable(emptyTable, checkins);
          vm.presencePercentage = studentService.getPresencePercentage(vm.presence);
        });

    };
  };
})();
