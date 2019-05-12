"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const gulp_scss = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const gulp_pug = require("gulp-pug");
const del = require("del");


function server() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		},
		tunnel: false,
		host: 'localhost',
		port: 3000,
		logPrefix: "ThePartyTemptation"
	});

	gulp.watch([
		'./src/pug/**/*.pug',
		'./src/pug/**/*.html'
	], pug);
	gulp.watch('./src/sass/**/*.scss', scss);
	gulp.watch('./src/js/**/*.js', copyJS);
	gulp.watch('./src/fonts/**/*', copyFonts);
	gulp.watch('./src/libs/**/*', copyLibs);
	gulp.watch('./src/img/**/*', copyImg);
	gulp.watch('./src/video/**/*', copyVideo);
	gulp.watch('./src/mail.php', copyMail_php);
	gulp.watch('./src/files/**/*', copyFiles);
}

function pug() {
	return gulp.src('./src/pug/pages/**/*.pug')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "Pug",
						message: err.message
					}
				})
			})
		)
		.pipe(sourcemaps.init())
		.pipe(gulp_pug({
			pretty: true // unminimized
		}))
		.pipe(sourcemaps.write("maps/"))
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
}

function pug_dep() {
	return gulp.src('./src/pug/pages/**/*.pug')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "Pug",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp_pug({
			pretty: false // minimized
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
}

function scss() {
	return gulp.src('./src/sass/main.scss')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "Styles",
						message: err.message
					}
				})
			})
		)
		.pipe(sourcemaps.init())
		.pipe(gulp_scss())
		.pipe(autoprefixer({
			browsers: ['last 6 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write("maps/"))
		.pipe(gulp.dest('./build/css/'))
		.pipe(browserSync.stream());
}

function scss_dep() {
	return gulp.src('./src/sass/main.scss')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "Styles",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp_scss({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 6 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./build/css/'))
		.pipe(browserSync.stream());
}

function copyJS() {
	return gulp.src('./src/js/**/*')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyJS",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function copyLibs() {
	return gulp.src('./src/libs/**/*')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyLibs",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/libs'))
		.pipe(browserSync.stream());
}

function copyFonts() {
	return gulp.src('./src/fonts/**/*')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyFonts",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/fonts'))
		.pipe(browserSync.stream());
}

function copyImg() {
	return gulp.src('./src/img/**/*')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyImg",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream());
}

function copyVideo() {
	return gulp.src('./src/video/**/*')
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyVideo",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/video'))
		.pipe(browserSync.stream());
}

function copyMail_php() {
	return gulp.src('./src/mail.php', {
			allowEmpty: true
		})
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyMail_php",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/'))
		.pipe(browserSync.stream());
}

function copyFiles() {
	return gulp.src('./src/files/**/*', {
			allowEmpty: true
		})
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: "copyFiles",
						message: err.message
					}
				})
			})
		)
		.pipe(gulp.dest('./build/files'))
		.pipe(browserSync.stream());
}

function cleanBuild() {
	return del('./build');
}

/* ==================================== */

gulp.task('build', gulp.series(
	cleanBuild,
	gulp.parallel(
		pug,
		scss,
		copyJS,
		copyLibs,
		copyFonts,
		copyImg,
		copyVideo,
		copyMail_php,
		copyFiles
	)
));

gulp.task('build_dep', gulp.series(
	cleanBuild,
	gulp.parallel(
		pug_dep,
		scss_dep,
		copyJS,
		copyLibs,
		copyFonts,
		copyImg,
		copyVideo,
		copyMail_php,
		copyFiles
	)
));

/* ==================================== */

exports.pug = pug;
exports.scss = scss;
exports.copyJS = copyJS;
exports.copyLibs = copyLibs;
exports.copyFonts = copyFonts;
exports.copyImg = copyImg;
exports.copyVideo = copyVideo;
exports.copyMail_php = copyMail_php;
exports.copyFiles = copyFiles;
exports.server = server;
exports.cleanBuild = cleanBuild;

exports.default = gulp.series("build", server);
