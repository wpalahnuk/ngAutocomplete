module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngmin:{
      main:{
        src: [
          "src/ngAutocomplete.js"
        ],
        dest: "build/<%= pkg.name %>.ngmin.js"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.ngmin.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');

  // Default task(s).
  grunt.registerTask('default', ['ngmin:main','uglify']);

};