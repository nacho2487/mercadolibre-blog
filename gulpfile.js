/**
 * Dependencies
 */
var gulp = require('gulp');

var buildClean = require('./node_modules/ui-gulp_tasks/tasks/build.clean');
var buildScripts = require('./node_modules/ui-gulp_tasks/tasks/build.scripts.concat');
var buildStyles = require('./node_modules/ui-gulp_tasks/tasks/build.styles');
var buildHTML = require('ui-gulp_tasks/tasks/build.html');
var buildImages = require('ui-gulp_tasks/tasks/build.images');

var distClean = require('./node_modules/ui-gulp_tasks/tasks/dist.clean');
var distScripts = require('./node_modules/ui-gulp_tasks/tasks/dist.scripts');
var distStyles = require('./node_modules/ui-gulp_tasks/tasks/dist.styles');
var distHTML = require('ui-gulp_tasks/tasks/dist.html');
var distImages = require('ui-gulp_tasks/tasks/dist.images');
var paths = {
    build: {
        'root': './build/',
        'scripts': './build/js/',
        'styles': './build/css/',
        'images': './build/images/',
        'html': './build/'
    },
    dist: {
        'root': './dist/',
        'scripts': './dist/js/',
        'styles': './dist/css/',
        'images': './dist/images/',
        'html': './dist/'
    }
};

var bundles = {
    scripts: {
      'bundle': ['./node_modules/waypoints/lib/noframework.waypoints.min.js', './src/js/*.js']
    },
    styles: {
      'bundle': ['./src/css/*.scss']
    },
    html: {
      'index': ['./src/*.html']
    },
    images: {
      'index': ['./src/images/*']
    }
};


buildClean(gulp, paths, bundles);
buildScripts(gulp, paths, bundles);
buildStyles(gulp, paths, bundles);
buildHTML(gulp, paths, bundles);
buildImages(gulp, paths, bundles);

distClean(gulp, paths, bundles);
distStyles(gulp, paths, bundles, {
    revision: true,
    gzipThreshold: 10240000 // Disabled gzip
});
distScripts(gulp, paths, bundles, {
    revision: true,
    gzipThreshold: 10240000 // Disabled gzip
});
distImages(gulp, paths, null, {
    'revision': false
});
distHTML(gulp, paths);

gulp.task('build', [
 'build:clean',
 'build:scripts-concat',
 'build:styles',
 'build:html',
 'build:images'
]);

gulp.task('dist', [
    'dist:clean',
    'dist:scripts',
    'dist:styles',
    'dist:html',
    'dist:images'
]);


gulp.task('watch', function() {
    gulp.start('build');
    gulp.watch(['./src/js/*.js'], ['build:scripts-concat']);
    gulp.watch(['./src/css/*.scss'], ['build:styles']);
    gulp.watch(['./src/*.html'], ['build:html']);
});
