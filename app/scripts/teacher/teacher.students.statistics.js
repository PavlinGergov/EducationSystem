(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .controller('studentStatisticsCtrl', studentStatisticsCtrl);

  function studentStatisticsCtrl($state,user, tableData, studentService, profileService, teacherService, $scope, $filter) {
    var vm = this;

    activate();
    vm.state = $state;
    var emptyTable = tableData.data;
    vm.weekdays = tableData.weekdays;
    vm.currentCA = $scope.slvm.courseAssignments.filter(function(ca) {
      return ca.user.id == $state.params.studentId;
    })[0];

    vm.addNote = function(caId) {
      var data = {
        'text': vm.newNote,
        'assignment': caId
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
      var data = {
        'ca_id': cdId.id, 
        'is_attending': !cdId.is_attending
      };
      teacherService.dropStudent(data)
        .then(function(){
          vm.currentCA.is_attending = !cdId.is_attending;
          $scope.slvm.courseAssignments.forEach(function(ca) {
            if(ca.id === data.ca_id) {
              ca.is_attending = data.is_attending;
            }
          });
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
