module.exports = function(grunt) {
    require('time-grunt')(grunt);

    var currentdate = new Date();
    var config = require('./.screeps.json')
    var branch = grunt.option('branch') || config.branch;
    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var ptr = grunt.option('ptr') ? true : config.ptr
    var private_directory = grunt.option('private_directory') || config.private_directory;

    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")
    grunt.loadNpmTasks("grunt-rsync")
    grunt.loadNpmTasks("grunt-shell")

    grunt.initConfig({
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr,
                private_directory: private_directory
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        // Remove all files from the dist folder.
        clean: {
          'dist': ['dist/*', '!dist/.git', '!dist/README.md', '!dist/version.js']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
          // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: 'dist/',
              filter: 'isFile',
              rename: function (dest, src) {
                // Change the path name utilize underscores for folders
                return dest + src.replace(/\//g,'_');
              },
            }],
          }
        },

        // Copy files to the folder the client uses to sink to the private server.
        // Use rsync so the client only uploads the changed files.
        rsync: {
          options: {
            args: ["--verbose", "--checksum"],
            exclude: [".git*"],
            recursive: true
          },
          private: {
            options: {
              src: './dist/',
              dest: private_directory,
            }
          },
        },

        shell: {
          options: {},
          rollup: './node_modules/rollup/dist/bin/rollup -c'

        },
        // Add version variable using current timestamp.
        file_append: {
          versioning: {
            files: [
              {
                append: "\nglobal.SCRIPT_VERSION = " + currentdate.getTime() + "\n",
                input: 'dist/version.js',
              }
            ]
          }
        },
        // Apply code styling
        jsbeautifier: {
          modify: {
            src: ["src/**/*.js"],
            options: {
              config: '.jsbeautifyrc'
            }
          },
          verify: {
            src: ["src/**/*.js"],
            options: {
              mode: 'VERIFY_ONLY',
              config: '.jsbeautifyrc'
            }
          }
        }

    })

  grunt.registerTask('default', ['clean',  'shell:rollup', 'file_append:versioning', 'screeps']);
  grunt.registerTask('private', ['clean',  'shell:rollup', 'file_append:versioning', 'rsync:private']);
  grunt.registerTask('test', ['jsbeautifier:verify']);
  grunt.registerTask('pretty', ['jsbeautifier:modify']);
}