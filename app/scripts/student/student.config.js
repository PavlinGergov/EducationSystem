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
        templateUrl: 'views/student/student-course-overview.html',
        resolve: {
          user: profileData,
          tableData: tableData
        }
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
        templateUrl: 'views/student/student-course-students.html',
        resolve: {
          students: students
        }
      });

    function students(studentService, $stateParams) {
      return studentService.getStudentsForCourse($stateParams.courseId)
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

    function tableData(user, studentService, $stateParams) {
      var courseId;
      if(!$stateParams.courseId) {
        courseId = user.student.courseassignment_set[0].course.id;
      }
      else {
        courseId = $stateParams.courseId;
      }

      return studentService.getLecturesForCourse(courseId)
        .then(function(response) {
          return response;
        });
    }
  };
})();
