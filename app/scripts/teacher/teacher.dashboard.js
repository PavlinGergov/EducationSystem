(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .controller('teacherDashboardCtrl', teacherDashboardCtrl);

  function teacherDashboardCtrl(user, navbar, teacherService) {
    var vm = this;

    vm.menu = navbar.teacher();

    activate();

    function activate() {
      vm.user = user;
      vm.teachedCourses = teacherService.getTeachedCourses(vm.user);
      console.log(vm.teachedCourses);
    }
  }
})();
