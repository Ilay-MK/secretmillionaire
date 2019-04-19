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
	gulp.watch('./src/libs/**/*', copyLibs);
	gulp.watch('./src/img/**/*', copyImg);
	gulp.watch('./src/video/**/*', copyVideo);
	gulp.watch('./src/mail.php', copyMail_php);
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
		.pipe(sourcemaps.write())
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
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css/'))
		.pipe(browserSync.stream());
}

function copyJS() {
	return gulp.src('./src/js/**/*')
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function copyLibs() {
	return gulp.src('./src/libs/**/*')
		.pipe(gulp.dest('./build/libs'))
		.pipe(browserSync.stream());
}

function copyImg() {
	return gulp.src('./src/img/**/*')
		.pipe(gulp.dest('./build/img'))
		.pipe(browserSync.stream());
}

function copyVideo() {
	return gulp.src('./src/video/**/*')
		.pipe(gulp.dest('./build/video'))
		.pipe(browserSync.stream());
}

function copyMail_php() {
	return gulp.src('./src/mail.php')
		.pipe(gulp.dest('./build/'))
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
			copyImg,
			copyVideo,
			copyMail_php
		)
	)
);

/* ==================================== */

exports.pug = pug;
exports.scss = scss;
exports.copyJS = copyJS;
exports.copyLibs = copyLibs;
exports.copyImg = copyImg;
exports.copyVideo = copyVideo;
exports.copyMail_php = copyMail_php;
exports.server = server;
exports.cleanBuild = cleanBuild;

exports.default = gulp.series("build", server);
