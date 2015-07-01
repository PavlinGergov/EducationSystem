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
        templateUrl: 'views/teacher/teacher-course-statistics.html'
      })
      .state('teachersDashboard.students', {
        url: '/students/:courseId',
        controller: 'studentsListCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-student-list.html'
      })
      .state('teachersDashboard.students.statistics', {
        url: '/:studentId',
        controller: 'studentStatisticsCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-student-statistics.html',
        resolve: {
          tableData: tableData
        }
      });

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
          console.log(response);
          return response;
        });
    }
  }
})();
