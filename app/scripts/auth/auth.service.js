(function() {
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .factory('authService', authService);

  function authService($http, BASE_URL, EDUCATION_URL) {
    var service = {
      register: register,
      login: login,
      activate: activate,
      splitName: splitName,
      logout: logout,
      profile: profile,
      userData: userData,
      changeMac: changeMac,
      changeSocialLinks: changeSocialLinks,
      transformMac: transformMac
    };

    return service;

    function transformMac(mac_address) {
      // малки букви
      // две точки не тире
      //      var mac = '1A-2B-3c-4d-5e-6f';
      var mac = mac_address.toLowerCase().replace(/-/g, ':');
      return mac;
    }
    
    function logout() {
      //send delete request
    }
    function register(user) {
      //send url
      return $http.post(BASE_URL + 'register/', user)
        .then(function(response) {
          return response;
        });
    };

    function login(user) {
      return $http.post(BASE_URL + 'login/', user)
        .then(function(response) {
          return response;
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
      console.log(user);
      var result = {
        'name': user.first_name + " " + user.last_name,
        'email': user.email,
//      'avatar': user.avatar,
        'avatar': 'https://s-media-cache-ak0.pinimg.com/736x/10/61/61/1061614ee7f3a3e64be576c2cc04d13e.jpg',
        'social_links': {
          'github_account': user.github_account,
          'linkedin_account': user.linkedin_account,
          'twitter_account': user.twitter_account
        }
      };
      if(user.student === null) {
        result.mac = null;
        result.courses = null;
      }
      else {
        result.mac = user.student.mac;
        result.courses = status(user.student.courseassignment_set);
      }
      if(user.competitor === null || user.competitor.teammembership_set.length === 0) {
        result.challenges = null;
      }
      else {
        result.challenges = user.competitor.teammembership_set;
      }
      console.log(result);
      return result;
    }

    function changeMac(mac) {
      // patch
      // mac
      // education/student-update
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {
        'mac_address': mac
      };
      $http.patch(EDUCATION_URL + 'student-update/', data, options)
        .success(function(data) {
          return data;
        })
        .error(function(error) {
          return error;
        });
    }
    
    function changeSocialLinks(data) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      
      $http.patch(BASE_URL + 'baseuser-update/', data, options)
        .success(function(data) {
          return data;
        })
        .error(function(error) {
          return error;
        });
    }
  }
})();
