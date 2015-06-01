(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(user) {
    var vm = this;
    vm.user = {
      first_name: 'Margarita',
      last_name: 'Vasileva',
      email: 'm.vasileva@example.com',
      avatar: 'https://s-media-cache-ak0.pinimg.com/736x/10/61/61/1061614ee7f3a3e64be576c2cc04d13e.jpg',
      social_links: {
        github: 'https://github.com/Shosh',
        twitter: 'https://twitter.com/sho_clk',
        linkedin: '-'        
      },
      courses: [
        {
          name: 'Programming 101 v2',
          status: 'done',
          notes: 'notes here'
        },
        {
          name: 'Ruby on Rails',
          status: 'taking',
          notes: 'notes2 here'
        },
        {
          name: 'C',
          status: 'dropped',
          notes: 'notes3 here'
        }
      ],
      challenges: [
        {
          hackathon: 'HackFMI5',
          team_name: 'Example name',
          idea_description: 'Example idea',
          place: 1
        },
        {
          hackathon: 'HackBulgaria Hackathon',
          team_name: 'Test name',
          idea_description: 'Test idea',
          place: 'N/A'
        }
      ]
    };
  }
})();
