(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .factory('teacherService', teacherService);

  function teacherService($http, EDUCATION_URL) {
    var service = {
      getTeachedCourses: getTeachedCourses,
      getCAsForCourse: getCAsForCourse
    };

    return service;

    function getTeachedCourses(user) {
      console.log(user);
      return user.teacher.teached_courses.reverse();
    }
      
    function getCAsForCourse(courseId) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(EDUCATION_URL + 'get-cas-for-course/?course_id=' + courseId, options)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
