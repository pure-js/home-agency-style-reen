gulp.task('copy', ['copy-images']);

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dev + 'img'));
});

gulp.task('copy-to-dist', ['copy-images-to-dist']);

gulp.task('copy-images-to-dist', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + 'img'));
});
