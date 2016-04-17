var gulp = require('gulp'),
  fs = require('fs'),
  replace = require('gulp-replace'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  plumber = require('gulp-plumber'),
  htmlmin = require('gulp-htmlmin'),
  cssnano = require('gulp-cssnano'),
  spritesmith = require('gulp.spritesmith'),
  ghPages = require('gulp-gh-pages'),
  csslint = require('gulp-csslint'),
  merge = require('merge-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  server = require('karma').Server;

var paths = {
  pug: 'pages/*.pug',
  pugWatch: [
    'blocks/**/*.pug',
    'pages/*.pug'
  ],
  stylus: [
    'stylesheets/main.styl',
    'stylesheets/above-the-fold.styl'
  ],
  stylusWatch: [
    'blocks/**/*.styl',
    'stylesheets/main.styl'
  ],
  images: 'img/**/*.{png,jpg}',
  css: 'bower_components/normalize.css/normalize.css',
  build: 'build/',
  dist: 'dist/'
};

// Get one .styl file and render
gulp.task('css', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.build + 'css'));
});

gulp.task('html', function() {
  return gulp.src(paths.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('minify-html', ['minify-css'], function() {
  return gulp.src(paths.pug)
    .pipe(plumber())
    .pipe(pug())
    // Css from file to inline
    .pipe(replace(/<link href="css\/above-the-fold.css" rel="stylesheet">/, function(s) {
      var style = fs.readFileSync('dist/css/above-the-fold.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', ['copy-images']);

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + 'img'));
});

gulp.task('copy-to-dist', ['copy-images-to-dist']);

gulp.task('copy-images-to-dist', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('csslint', ['build'], function() {
  gulp.src([paths.build + 'css/*.css'])
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('test', ['csslint']);

gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('img/previews/*.jpg')
    .pipe(spritesmith({
      imgName: '../img/sprites/sprite.png',
      cssName: 'sprite.styl'
    }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    // .pipe(buffer())
    // .pipe(imagemin())
    .pipe(gulp.dest('./sprites'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    // .pipe(csso())
    .pipe(gulp.dest('stylesheets'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.pugWatch, ['html']);
});

gulp.task('deploy', ['dist'], function() {
  return gulp.src(paths.dist + '**/*')
    .pipe(ghPages());
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html', 'css', 'watch', 'copy']);
gulp.task('dist', ['minify-html', 'minify-css', 'copy-to-dist', 'sprite']);
gulp.task('default', ['build']);
