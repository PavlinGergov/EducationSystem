(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .controller('teacherDashboardCtrl', teacherDashboardCtrl);

  function teacherDashboardCtrl(user, navbar, teacherService) {
    var vm = this;
    vm.user = user;

    vm.menu = navbar.getMenu(vm.user);

    activate();

    function activate() {

      vm.teachedCourses = vm.user.teacher.teached_courses;
    }
  }
})();
