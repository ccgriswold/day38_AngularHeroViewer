var gulp = require('gulp');//npm install --save-dev gulp
var sass = require('gulp-sass');//npm install --save-dev gulp-sass
var browserify = require('gulp-browserify');//npm install --save-dev gulp-browserify
//var uglify = require('uglify'); //npm install --save-dev uglify
var ngAnnotate = require('gulp-ng-annotate');//npm install --save-dev gulp-ng-annotate

gulp.task('default', ['html', 'js', 'css', 'images']);

gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('css', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./js/app.js')
        .pipe(browserify())
        .pipe(ngAnnotate())
    //    .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('images', function(){
    return gulp.src('./images/*')
        .pipe(gulp.dest('./public/images'));
});

gulp.task('watch', function () {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./js/models/*.js', ['js']);
    gulp.watch('./js/views/*.js', ['js']);
});
