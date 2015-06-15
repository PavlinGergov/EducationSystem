(function() {
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .factory('authService', authService);

  function authService($http, BASE_URL, EDUCATION_URL, URL, $q) {
    var service = {
      register: register,
      login: login,
      activate: activate,
      splitName: splitName,
      logout: logout,
      resetPassword: resetPassword,
      setNewPassword: setNewPassword,
      profile: profile,
      userData: userData,
      changeMac: changeMac,
      changeSocialLinks: changeSocialLinks
    };

    return service;

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

    function transformMac(macAddress) {
      return macAddress.toLowerCase().replace(/-/g, ':');
    }

    function resetPassword(data) {
      return $http.post(BASE_URL + 'password-reset/', data)
        .then(function(response) {
          console.log(response);
          var msg = 'Изпратихме ти email с линк, от който можеш да промениш паролата си.';
          toast('success', 'toast-top-right', msg);
        })
        .catch(function(error) {
          errorsNotification(error);
        });
    }

    function setNewPassword(data) {
      return $http.post(BASE_URL + 'password-reset-confirm/', data)
        .then(function(response) {
          var msg = 'Успешно промени паролата си.';
          toast('success', 'toast-top-right', msg);
        })
        .catch(function(error) {
          errorsNotification(error);
        });
    }
    
    function logout() {
      //send delete request
    }
    
    function register(user) {
      return $http.post(BASE_URL + 'register/', user)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          errorsNotification(error);
          return $q.reject(error);
        });
          
    };

    function login(user) {
      return $http.post(BASE_URL + 'login/', user)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          errorsNotification(error);
          return $q.reject(error);
        });
    }

    function activate(data) {
      return $http.post(BASE_URL + 'activate/', data);
    }

    function splitName(name) {
      var fullName = name.split(' ');
      fullName = fullName.filter(Boolean);
      return fullName;
    }

    function profile() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(BASE_URL + 'me/', options)
        .then(function(response) {
          return userData(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function status(courses) {
      courses = courses.map(function(course) {
        course.status = getStatus(course.course.start_time, course.course.end_time, course.is_attending);
        return course;
      });
      return courses;
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
    
    function userData(user) {
      var result = {
        'name': user.first_name + " " + user.last_name,
        'email': user.email,
        'avatar': user.avatar,
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
      //   result.courses = status(user.student.courseassignment_set);
      console.log(user);
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
