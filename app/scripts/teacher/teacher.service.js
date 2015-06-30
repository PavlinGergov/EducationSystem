(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .factory('teacherService', teacherService);

  function teacherService($http) {
    var service = {
      getCourses: getCourses
    };

    return service;

    function getCourses(user) {
      console.log(user);
      return user.teacher.teached_courses.reverse();
    }

  }
})();
