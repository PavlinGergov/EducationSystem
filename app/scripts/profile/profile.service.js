(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .factory('profileService', profileService);

  function profileService($http, BASE_URL, EDUCATION_URL, URL, $filter) {
    var service = {
      getProfileData: getProfileData,
      changeMac: changeMac,
      changeSocialLinks: changeSocialLinks,
      getEvents: getEvents,
      buyTicket: buyTicket,
      students: students,
      lectures: lectures,
      getCheckins: getCheckins,
      getWeekDays: getWeekDays,
      getWeekDay: getWeekDay,
      getNumberOfWeek: getNumberOfWeek,
      lectureWeek: lectureWeek,
      notification: toast,
      addNote: addNote
    };

    return service;

    function addNote(data) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.post(EDUCATION_URL + 'create-student_note/', data, options)
        .success(function(response) {
          var msg = response.message;
          toast('success', 'toast-top-right', msg);
        })
        .error(function(error) {
        });
    }

    function lectures(courseId) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {'course_id' : courseId };
      return $http.get(EDUCATION_URL + 'get-lectures/?course_id=' + courseId, options)
        .then(function(response) {
          return response.data.map(function(lecture) {
            return lecture.date;
          }).filter(function(lectureDate) {
            return new Date(lectureDate) <= new Date();
          })
          .sort();
        });
      }

    function students(courseId) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(EDUCATION_URL + 'get-cas-for-course/?course_id=' + courseId, options)
        .then(function(response) {
          return response.data;
        });
    }

    function getCheckins(studentId, courseId) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(EDUCATION_URL + 'get-check-ins/?student_id=' + studentId + '&course_id=' + courseId, options)
        .then(function(response) {
          return response.data;
        });
    }

    function getWeekDays(lectures) {
      var days = ['Monday', 'Tuesday', 'Wednesday',
       'Thursday', 'Friday', 'Saturday', 'Sunday'];
      var lectureDays = lectures.map(function(lecture) {
        return $filter('date')(new Date(lecture), 'EEEE');
      }).filter(function (v, i, a) {
        return a.indexOf(v) === i;
      });
      return days.filter(function(day) {
        return lectureDays.indexOf(day) !== -1;
      });
    }

    function getWeekDay(date) {
      return $filter('date')(new Date(date), 'EEEE');
    }

    function getNumberOfWeek(date) {
      var date = new Date(date);
      return 'w' + $filter('date')(date, 'w') + 52 *
          $filter('date')(date, 'y');
    }

    function lectureWeek(lectures, lectureDays) {
      var data = {};

      lectures.forEach(function(lecture) {
        var numberOfWeek = getNumberOfWeek(lecture);
        if (!data[numberOfWeek]) {
          data[numberOfWeek] = Array.apply(null, Array(lectureDays.length)).map(String.prototype.valueOf, ' ');
        }
        var index = lectureDays.indexOf(getWeekDay(lecture));
        data[getNumberOfWeek(lecture)][index] = {'date': lecture, 'presence': false};
      });
      return data;
    }

    function toast(type, css, msg) {
      toastr.options.positionClass = css;
      toastr[type](msg);
    }

    function errorsNotification(err) {
      Object.keys(err.data).map(function(key) {
        err.data[key].map(function(msg) {
          toast('error', 'toast-top-right', msg);
        });
      });
    }

    function getEvents() {
      return $http.get(BASE_URL + 'get-events/')
        .then(function(response) {
          return filterEvents(response.data);
        });
    }

    function filterEvents(events) {
      return events.filter(function(event) {
          var now = new Date();
          var eventDate = new Date(event.start_date);
            return eventDate > now;
        });
    }

    function buyTicket(eventId) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {'event_id': eventId};
      return $http.post(BASE_URL + 'buy-ticket/', data, options)
        .then(function(response) {
          var msg = 'Успешно взе своя билет за HackConf 2015';
          toast('success', 'toast-top-right', msg);
        })
        .catch(function(error) {
        });
    }

    function transformMac(macAddress) {
      return macAddress.toLowerCase().replace(/-/g, ':');
    }

    function getStatus(courseStart, courseEnd, isAttending) {
      var cStart = new Date(courseStart);
      var cEnd = new Date(courseEnd);

      if(isAttending === false) {
        return 'dropped';
      }
      else {
        var now = new Date();
        if(cStart < now && now < cEnd) {
          return 'taking';
        }
        else {
          return 'done';
        }
      }
    }

    function status(courses) {
      courses = courses.map(function(course) {
        course.status = getStatus(course.course.start_time, course.course.end_time, course.is_attending);
        return course;
      });
      return courses;
    }

    //def service methods here
    function getProfileData() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(BASE_URL + 'me/', options)
        .then(function(response) {
          return userData(response.data);
        })
        .catch(function(error) {
        });
    }

    function userData(user) {
      var result = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'avatar': user.avatar,
        'ticket_set': user.ticket_set,
        'socialLinks': {
          'github_account': user.github_account,
          'linkedin_account': user.linkedin_account,
          'twitter_account': user.twitter_account
        },
        'teacher': user.teacher,
        'competitor': user.competitor,
        'student': user.student
      };

      if(result.student !== null) {
        result.student.courseassignment_set = status(user.student.courseassignment_set);
        result.student.courseassignment_set = $filter('orderBy')(result.student.courseassignment_set, 'course.start_time', true);
      }

      if(result.teacher !== null) {
        result.teacher.teached_courses = $filter('orderBy')(result.teacher.teached_courses, 'start_time', true);
        console.log(result.teacher.teached_courses);
      }
      
      return result;
    }

    function changeMac(mac) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {
        'mac': transformMac(mac)
      };
      $http.patch(EDUCATION_URL + 'student-update/', data, options)
       .then(function() {
         toast('success', 'toast-top-right', 'Успешно редактира MAC адреса си!');
       })
       .catch(function() {
         return $q.reject();
       });
    }

    function changeSocialLinks(data) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};

      $http.patch(BASE_URL + 'baseuser-update/', data, options)
        .success(function(data) {
          toast('success', 'toast-top-right', 'Успешно редактира социалните си линкове!');
        })
        .error(function(error) {
          return error;
        });
    }
  }
})();
