var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var data = require('gulp-data')
var browserSync = require('browser-sync')
var ejs = require('gulp-ejs')
const templatedir = './src/ejstemplate'
const distDir = './build'
gulp.task('ejs', function (cb) {
    gulp.src(templatedir + '/**/*.html')
        .pipe(data(function (file) {
            console.log('file'+file);
            var filePath = file.path;
            console.log(filePath);
            console.log(path.basename(filePath, '.html'))
            // global.json 全局数据，页面中直接通过属性名调用
            return Object.assign(JSON.parse(fs.readFileSync(templatedir + '/global.json')), {
                // local: 每个页面对应的数据，页面中通过 local.属性 调用
                local: JSON.parse(fs.readFileSync(path.join(path.dirname(filePath), path.basename(filePath, '.html') + '.json')))
            })
        }))
        .pipe(ejs().on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(distDir));
        cb();
});