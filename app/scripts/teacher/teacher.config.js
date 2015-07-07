(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('teachersDashboard', {
        url: '/teachers-dashboard',
        controller: 'teacherDashboardCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-dashboard.html',
        resolve: {
          user: profileData
        }
      })
      .state('teachersDashboard.statistics', {
        url: '/statistics/:courseId',
        controller: 'courseStatisticsCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-course-statistics.html',
        resolve: {
          user: profileData
        }
      })
      .state('teachersDashboard.students', {
        url: '/students/:courseId',
        controller: 'studentsListCtrl',
        controllerAs: 'slvm',
        templateUrl: 'views/teacher/teacher-student-list.html',
        resolve: {
          courseAssignments: courseAssignmentsData
        }
      })
      .state('teachersDashboard.students.statistics', {
        url: '/:studentId',
        controller: 'studentStatisticsCtrl',
        controllerAs: 'ssvm',
        templateUrl: 'views/teacher/teacher-student-statistics.html',
        
        resolve: {
          user: profileData,
          tableData: tableData
        }
      });

    function courseAssignmentsData(teacherService, $stateParams) {
      return teacherService.getCAsForCourse($stateParams.courseId)
      .then(function(response) {
        return response;
      });
    }
    
    function profileData(profileService) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        });
    }

    function tableData($stateParams, studentService) {
      var courseId;
      courseId = $stateParams.courseId;
     
      return studentService.getLecturesForCourse(courseId)
        .then(function(response) {
          return response;
        });
    }
  }
})();
