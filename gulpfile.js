var gulp=require('gulp');
var $=require('gulp-load-plugins')();
var connect = require('gulp-connect');
var open=require('open');

var app={
    srcPath:'src/',     //源代码放置的文件
    devPath:'build/',   //整合之后放置的文件
    prdPath:'dist/'
}

gulp.task('lib',function(){
    gulp.src('bower_components/**/*') //读取这个文件的所有文件
        .pipe(gulp.dest(app.devPath+'vendor'))
        .pipe(gulp.dest(app.prdPath+'vendor'))
});

gulp.task('html',function(){
    gulp.src(app.srcPath+'**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());  // 实现自动刷新 不支持低级浏览器
})

gulp.task('json',function(){
    gulp.src(app.srcPath+'data/**/*.json')
        .pipe(gulp.dest(app.devPath+'data'))
        .pipe(gulp.dest(app.prdPath+'data'))
        .pipe($.connect.reload());
})

gulp.task('less',function(){
    gulp.src(app.srcPath+'style/index.less')
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(app.devPath+'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath+'css'))
        .pipe($.connect.reload());
});

gulp.task('js',function(){
    gulp.src(app.srcPath+'script/**/*.js')
        .pipe($.plumber())
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath+'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath+'js'))
        .pipe($.connect.reload());
});

gulp.task('image',function(){
    gulp.src(app.srcPath+'image/**/*')
        .pipe(gulp.dest(app.devPath+'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath+'image'))
        .pipe($.connect.reload());
});

gulp.task('clean',function(){ // 清除目录
    gulp.src([app.devPath,app.prdPath])
        .pipe($.clean());

});

gulp.task('build',['image','js','less','lib','html','json']);

gulp.task('server',function(){
    connect.server({ // 创建服务器
        root:[app.devPath],
        livereload:true,  // 自动刷新 老IE不支持
        port:8088

    });


    // open('http://localhost:8080'); // 自动打开浏览器
    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath+'**/*.html',['html']);
    gulp.watch(app.srcPath+'data/**/*.json',['json']);
    gulp.watch(app.srcPath+'style/**/*.less',['less']);
    gulp.watch(app.srcPath+'script/**/*.js',['js']);
    gulp.watch(app.srcPath+'image/**/*',['image']);


});