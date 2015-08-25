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
        data: {
          permissions: {
            only: ['student', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          user: profileData
        }
      })
      .state('studentDashboard.overview', {
        url: '/overview/:courseId',
        controller: 'overviewCtrl',
        controllerAs: 'ovm',
        templateUrl: 'views/student/student-course-overview.html',
        data: {
          permissions: {
            only: ['student', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          user: profileData,
          tableData: tableData
        }
      })
      .state('studentDashboard.tasks', {
        url: '/tasks/:courseId',
        controller: 'tasksCtrl',
        controllerAs: 'tvm',
        templateUrl: 'views/student/student-course-tasks.html',
        data: {
          permissions: {
            only: ['student', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          tasks: tasks,
          solutions: solutions
        }
      })
      .state('studentDashboard.otherStudents', {
        url: '/other-students/:courseId',
        controller: 'otherStudentsCtrl',
        controllerAs: 'svm',
        templateUrl: 'views/student/student-course-students.html',
        data: {
          permissions: {
            only: ['student', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          students: students
        }
      });

    function tasks(studentService, $stateParams) {
      return studentService.getTasks($stateParams.courseId)
        .then(function(response) {
          return response;
        });
    };

    function solutions(studentService, $stateParams) {
      return studentService.getSolutions($stateParams.courseId)
        .then(function(response) {
          return response;
        });
    }

    function students(studentService, $stateParams) {
      return studentService.getStudentsForCourse($stateParams.courseId)
        .then(function(response) {
          return response;
        });
    }

    function profileData(profileService, $state) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        }, function(error) {
          localStorage.removeItem('token');
          $state.go('login');
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
