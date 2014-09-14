'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');

	var filesToWatch = [
		'server.js',
		'expressRouter.js',
		'tests/*.js',
		'app/*.js',
		'app/**/*.js',
		'models/*.js',
	];

	grunt.initConfig({

		// Linting and style
		jshint: {
			src: filesToWatch,
			options: {
				jshintrc: true
			}
		},

		jscs: {
			src: filesToWatch,
			options: {
				config: '.jscsrc'
			}
		},

		// Build
		clean: {
			all: {
				src: [
					'dist/'
				]
			}
		},

		copy: {
			all : {
				expand: true,
				cwd: 'app/',
				src: [
					'*.html',
					'**/*.html'
				],
				dest: 'dist/',
				filter: 'isFile'
			}
		},

		browserify: {
			dev: {
				options: {
					transform: [
						'debowerify'
					],
					debug: true
				},
				src: [
					'app/**/*.js'
				],
				dest: 'dist/scripts.js'
			}
		},

		// Serve and watch
		express: {
			dev: {
				options: {
					script: 'server.js',
					background: true
				}
			}
		},

		watch: {
			all: {
				files: filesToWatch,
				tasks: [
					'jshint',
					'jscs',
					'clean',
					'copy',
					'browserify:dev',
					'express:dev'
				]
			}
		}

	});

	grunt.registerTask('default', [
			'jshint',
			'jscs',
			'clean',
			'copy',
			'browserify:dev',
			'express:dev',
			'watch:all'
		]);
};