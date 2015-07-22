(function() {
  'use strict';

  angular
    .module('educationSystemApp.nav')
    .factory('navbar', navbar);

  function navbar($state, teacherService, studentService) {
    var service = {
      getMenu: getMenu
    };

    return service;

    function getMenu(user) {
      var courseId;
      var menu;
      //if isTeacher
      if(user.isTeacher && !user.isStudent) {
        courseId = user.teacher.teached_courses[0].id;
        menu = teacher(courseId);
      }
      //if isStudent
      else if(!user.isTeacher && user.isStudent) {
        courseId = studentService.getCourses(user)[0].course.id;
        menu = student(courseId);
      }
      //if isUser
      else if(!user.isTeacher && !user.isStudent) {
        menu = userMenu();
      }
      //if isStudentAndTeacher
      else if(user.isTeacher && user.isStudent) {
        courseId = user.teacher.teached_courses[0].id;
        menu = studentAndTeacher(courseId);
      }
      return menu;
    };

    function userMenu() {
      var menu = [
        {
          title: "Профил",
          action: 'profile'
        },
        {
          title: "Изход",
          action: 'logout'
        }
      ];
      return menu;
    };

    function teacher(firstCourseId) {
      var menu = [
        {
          title: "Dashboard",
          action: 'teachersDashboard.statistics({ courseId: '+ firstCourseId +'})'
        },
        {
          title: "Профил",
          action: 'profile'
        },
        {
          title: "Изход",
          action: 'logout'
        }
      ];
      return menu;
    };

    function student(firstCourseId) {
      var menu = [
        {
          title: "Dashboard",
          action: 'studentDashboard.overview({courseId: '+ firstCourseId +'})'
        },
        {
          title: "Профил",
          action: 'profile'
        },
        {
          title: "Изход",
          action: 'logout'
        }
      ];
      return menu;
    };

    function studentAndTeacher(firstCourseId) {
      var menu = [
        {
          title: "StudentDashboard",
          action: 'studentDashboard.overview({courseId: '+ firstCourseId +'})'
        },
        {
          title: "TeachersDashboard",
          action: 'teachersDashboard.statistics({ courseId: '+ firstCourseId +'})'
        },
        {
          title: "Профил",
          action: 'profile'
        },
        {
          title: "Изход",
          action: 'logout'
        }
      ];
      return menu;
    };
  }
})();
