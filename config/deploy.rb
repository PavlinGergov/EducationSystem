# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'education'
set :repo_url, 'https://github.com/HackSoftware/EducationSystem.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/hack/education/'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('app/scripts/config/config.module.js')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'node_modules', 'bower_components')

# Default value for default_env is {}
set :default_env, { 
  path: ["/usr/local/rbenv/shims",
    "#{shared_path}/node_modules/bower/bin", 
    "#{shared_path}/node_modules/grunt-cli/bin",
    "/usr/local/rbenv/versions/#{fetch(:rbenv_ruby)}/bin",
    "$PATH"].join(":")
}
# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
  task :bower_and_npm_install do 
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do 
        execute :npm, "install"
        execute :bower, "install"
      end
    end
  end

   task :build do 
    on roles(:app), in: :sequence, wait: 5 do 
      within release_path do 
        execute :grunt, "build"
      end
    end
  end

  after :published, :bower_and_npm_install
  after :bower_and_npm_install, :build
end
