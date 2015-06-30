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
        url: ':courseId/:studentId',
        controller: 'studentStatisticsCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-student-statistics.html'
      });

    function profileData(profileService) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        });
    }
  }
})();
