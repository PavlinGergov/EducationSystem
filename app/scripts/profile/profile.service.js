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
      courses: courses,
      students: students,
      lectures: lectures,
      getCheckins: getCheckins,
      getWeekDays: getWeekDays,
      getWeekDay: getWeekDay,
      getNumberOfWeek: getNumberOfWeek,
      lectureWeek: lectureWeek
    };

    return service;


    function lectures(courseId) {
      var data = {'course_id' : courseId };
      return $http.get(EDUCATION_URL + 'get-lectures/?course_id=' + courseId)
        .then(function(response) {
          return response;
        });
      }

    function courses() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(EDUCATION_URL + 'get-courses/', options)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function students(courseId) {
      return $http.get(EDUCATION_URL + 'get-students-for-course/?course_id=' + courseId)
        .then(function(response) {
          return response.data;
        });
    }

    function getCheckins(studentId) {
      return $http.get(EDUCATION_URL + 'get-check-ins/?student_id=' + studentId)
        .then(function(response) {
          return response.data;
        });
    }

    function getWeekDays(lectures) {
      // TODO: Sort lecture days
      return lectures.map(function(lecture) {
        return $filter('date')(new Date(lecture), 'EEEE');
      }).filter(function (v, i, a) {
        return a.indexOf(v) === i;
      });
    }

    function getWeekDay(date) {
      return $filter('date')(new Date(date), 'EEEE');
    }

    function getNumberOfWeek(date) {
      var date = new Date(date);
      return $filter('date')(date, 'w') + 52 *
        $filter('date')(date, 'y');
    }

    function lectureWeek(lectures, lectureDays) {
      //TODO: GET rid of undefined
      var data = {};
      lectures.forEach(function(lecture) {

        if (!data[getNumberOfWeek(lecture).toString()]) {
          data[getNumberOfWeek(lecture).toString()] = [];
        }
        var index = lectureDays.indexOf(getWeekDay(lecture));
        data[getNumberOfWeek(lecture).toString()][index] = {
          'date': lecture,
          'presence': false
        };
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
      console.log(user);
      var result = {
        'name': user.first_name + " " + user.last_name,
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
        result.student.courses = status(user.student.courseassignment_set);
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
