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
