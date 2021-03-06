(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .factory('teacherService', teacherService);

  function teacherService($http, ENV, $q, profileService, $filter) {
    var service = {
      getTeachedCourses: getTeachedCourses,
      getCAsForCourse: getCAsForCourse,
      getCourseById: getCourseById,
      getStatistics: getStatistics,
      dropStudent: dropStudent
    };

    return service;

    function getTeachedCourses(user) {
      return user.teacher.teached_courses;
    }

    function getCourseById(user, courseId) {
      var result = user.teacher.teached_courses.filter(function(course) {
        return course.id == courseId;
      });
      return result[0];
    }

    function getCAsForCourse(courseId) {
      return $http.get(ENV.education + 'course-assignment/?course__id=' + courseId)
        .then(function(response) {
          return response.data;
        });
    }

    function getStatistics(courseAssignments) {
      var studentsStarted = courseAssignments.length;
      var studentsDropped = 0;
      var presenceWithoutDropped = 0;
      var totalPresence = 0;

      courseAssignments.forEach(function(CA) {
        if(CA.is_attending) {
          presenceWithoutDropped += Number(CA.student_presence);
        }
        else {
          studentsDropped += 1;
        }
        totalPresence += Number(CA.student_presence);
      });

      var statistics = {
        started: studentsStarted,
        dropped: studentsDropped,
        dropRate: (studentsDropped / studentsStarted) * 100,
        attendanceRate: totalPresence / studentsStarted,
        attendanceRateWithoutDropped: totalPresence / (studentsStarted - studentsDropped)
      };

      return statistics;
    }

    function dropStudent(data) {
      return $http.patch(ENV.education + 'drop-student/', data)
       .then(function() {
         profileService.notification('success', 'toast-top-right', 'Успешно променихте статуса на студента!');
       });
    }
  }
})();

