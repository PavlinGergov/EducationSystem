(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .config(configure);
  
  function configure($stateProvider) {
    $stateProvider
      .state('studentDashboard', {
        url: '/student-dashboard',
        controller: 'coursesCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/student/student-dashboard.html',
        resolve: {
          user: profileData
        }
      })
      .state('studentDashboard.overview', {
        url: '/overview/:courseId',
        controller: 'overviewCtrl',
        controllerAs: 'ovm',
        templateUrl: 'views/student/student-course-overview.html'
      })
      .state('studentDashboard.tasks', {
        url: '/tasks/:courseId',
        controller: 'tasksCtrl',
        controllerAs: 'tvm',
        templateUrl: 'views/student/student-course-tasks.html'
      })
      .state('studentDashboard.otherStudents', {
        url: '/other-students/:courseId',
        controller: 'otherStudentsCtrl',
        controllerAs: 'svm',
        templateUrl: 'views/student/student-course-students.html'
      });

    function profileData(profileService) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        });
    }
  };
})();
