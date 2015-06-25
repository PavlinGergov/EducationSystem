(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .factory('studentService', studentService);
  
  function studentService($http) {
    var service = {
      getCourses: getCourses
    };
    
    return service;
    
    //def service methods here
    function getCourses(user) {
      return user.student.courseassignment_set;
    }
  }
})();
