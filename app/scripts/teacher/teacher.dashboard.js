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
      vm.teachedCourses = vm.user.teacher.teached_courses.reverse();
      console.log(vm.teachedCourses);
    }
  }
})();
