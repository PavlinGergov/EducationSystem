(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .factory('teacherService', teacherService);

  function teacherService($http, EDUCATION_URL) {
    var service = {
      getTeachedCourses: getTeachedCourses,
      getCAsForCourse: getCAsForCourse,
      getAvgPresenceForCourseWithDropped: getAvgPresenceForCourseWithDropped,
      getAvgPresenceForCourseWithoutDropped: getAvgPresenceForCourseWithoutDropped

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

    function getAvgPresenceForCourseWithDropped(courseId) {
      return getCAsForCourse(courseId)
        .then(function(cas) {
          var totalPresence = 0;
          var students = cas.length;
          cas.forEach(function(ca) {
            totalPresence += Number(ca.student_presence);
          });
          return totalPresence / students;
        });
    }

    function getAvgPresenceForCourseWithoutDropped(courseId) {
      return getCAsForCourse(courseId)
        .then(function(cas) {
          var totalPresence = 0;
          var students = 0;
          cas.forEach(function(ca) {
            if (ca.is_attending) {
              totalPresence += Number(ca.student_presence);
              students += 1;
            }
          });
          return totalPresence / students;
        });
    }

  }
})();