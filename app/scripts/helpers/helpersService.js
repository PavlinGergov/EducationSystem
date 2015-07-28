(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .factory('helperService', helperService);
  
  function helperService() {
    var service = {
      courses        : courses,
      courseById     : courseById,
      firstCourse    : firstCourse,
      firstCourseId  : firstCourseId
    };
    
    return service;

    function courses(user) {
      if(user.isStudent) {
        return user.student.courseassignment_set;
      }
      else if(user.isTeacher) {
        return user.teacher.teached_courses;
      }
      return [];
    };

    function courseById(courses, courseId) {
      var currentCourse =  courses.filter(function(course) {
        return course.course.id == courseId;
      });
      return currentCourse[0];
    }

    function firstCourse(courses) {
      return courses[0];
    };

    function firstCourseId(courses) {
      var first = firstCourse(courses);
      return first.id;
    };
  }
})();
