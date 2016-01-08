var gulp = require('gulp'); //The streaming build system
var gutil = require('gulp-util');//Utility functions for gulp plugins
var source = require('vinyl-source-stream');//Use conventional text streams at the start of your gulp or vinyl pipelines, making for nicer interoperability with the existing npm stream ecosystem.
var browserify = require('browserify'); //browserify will recursively analyze all the require() calls in your app in order to build a bundle you can serve up to the browser in a single <script> tag.
var watchify = require('watchify'); //Update any source file and your browserify bundle will be recompiled on the spot.
var reactify = require('reactify'); //Browserify transform for JSX (a superset of JS used by React.js)
var notifier = require('node-notifier'); //A Node.js module for sending notifications on native Mac, Windows (post and pre 8) and Linux (or Growl as fallback)
var server = require('gulp-server-livereload');//Gulp plugin to run a local webserver with livereload enabled via socket.io
var concat = require('gulp-concat');//Concatenates files
var sass = require('gulp-sass');//Sass plugin for Gulp.
var watch = require('gulp-watch');//File watcher that uses super-fast chokidar and emits vinyl objects.

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle);

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
