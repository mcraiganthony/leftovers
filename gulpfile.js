// Load plugins
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    changed      = require('gulp-changed');
    concat       = require('gulp-concat'),
    duration     = require('gulp-duration'),
    ghpages      = require('gulp-gh-pages'),
    imagemin     = require('gulp-imagemin'),
    less         = require('gulp-less'),
    minifycss    = require('gulp-minify-css'),
    reload       = browserSync.reload,
    svgSprite    = require('gulp-svg-sprite'),
    uglify       = require('gulp-uglify');

// Path Variables
var paths =  {
  'html': {
    'src_files': 'dist/*.html'
  },
  'images': {
    'src_dir':  'src/img/**',
    'dist_dir': 'dist/img/'
  },
  'js': {
    'src_files': 'src/js/*.js',
    'dist_dir':  'dist/js/'
  },
  'styles': {
    'src_files': 'src/less/**/*.less',
    'dist_dir':  'dist/css/'
  },
  'svgicons': {
    'src_files': 'src/icons/*.svg',
    'dist_dir':  'dist/icons/'
  }
};


// HTML
gulp.task('html', function() {
  return gulp.src([paths.html.src_files])
    .pipe(reload({stream:true}));
});


// Images
gulp.task('images', function() {
  return gulp.src([paths.images.src_dir])
    .pipe(changed(paths.images.dist_dir))
    .pipe(gulp.dest(paths.images.dist_dir))
    .pipe(reload({stream:true}));
});


// Javascript
gulp.task('js', function() {
  return gulp.src([
    'node_modules/boomsvgloader/dist/js/boomsvgloader.min.js',
    paths.js.src_files
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist_dir))
    .pipe(duration('building js'))
    .pipe(reload({stream:true}));
});


// Styles
gulp.task('styles', function() {
  return gulp.src(['src/less/app.less'])
    .pipe(less({ compress: true }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.styles.dist_dir))
    .pipe(duration('building styles'))
    .pipe(reload({stream:true}));
});


// SVG Icons
gulp.task('svgicons', function () {
  return gulp.src(paths.svgicons.src_files)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.svgicons.dist_dir))
    .pipe(svgSprite({
      'shape': {
        'id': {
          'generator': 'icon-'
        }
      },
      'mode': {
        'symbol': {
          'dest': '',
          'example': true,
          'sprite': 'sprite.svg'
        }
      },
      'svg': {
        'xmlDeclaration': false,
        'doctypeDeclaration': false,
        'dimensionAttributes': false
      }
    }))
    .pipe(gulp.dest(paths.svgicons.dist_dir))
    .pipe(duration('building svg icons'))
    .pipe(reload({stream:true}));
});


// Watch
gulp.task('watch', function() {
  gulp.watch(paths.styles.src_files, ['styles']);
  gulp.watch(paths.js.src_files, ['js']);
  gulp.watch(paths.html.src_files, ['html']);
});


// Browser Sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dist/'
    },
    notify: false
  });
});


// Website
gulp.task('website', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghpages());
});


// Gulp Default
gulp.task('default', ['images','js','styles','svgicons']);


// Gulp Server
gulp.task('server', ['default','watch','browser-sync'], function () {
    gulp.watch([paths.html.src_files], reload);
});
