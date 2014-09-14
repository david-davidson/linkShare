'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-jscs');

	var filesToWatch = [
		'server.js',
		'expressRouter.js',
		'tests/*.js',
		'app/*.js',
		'models/*.js'
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
				files: [
					'*.js',
					'models/*',
					'app/*',
					'tests/*'
				],
				tasks: [
					'jshint',
					'jscs',
					'express:dev'
				]
			}
		}

	});

	grunt.registerTask('default', [
			'jshint',
			'jscs',
			'express:dev',
			'watch:all'
		]);
};