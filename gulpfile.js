const gulp = require("gulp")
const path = require("path")
const clear = require("gulp-clean")

//项目路径
let option = {
  base: "src",
  allowEmpty: true,
}
let dist = __dirname + "/dist"
let projectConfig = require("./package.json")

// 增加dependencies
const dependencies = projectConfig && projectConfig.dependencies // dependencies配置
let nodeModulesCopyPath = []
for (let d in dependencies) {
  nodeModulesCopyPath.push("node_modules/" + d + "/**/*")
}
//项目路径
let copyNodeModuleOption = {
  base: ".",
  allowEmpty: true,
}

//复制不包含less,sass和ts的文件
let copyPath = [
  "src/**/!(_)*.*",
  "!src/**/*.less",
  "!src/**/*.sass",
  "!src/**/*.scss",
  "!src/**/*.ts",
]

//清空目录
gulp.task("clear", () => {
  return gulp.src(dist, { allowEmpty: true }).pipe(clear())
})

//复制不包含less和图片的文件
gulp.task("copy", () => {
  console.log("开始执行copy")
  return gulp.src(copyPath, option).pipe(gulp.dest(dist))
})

//复制依赖的node_modules文件
gulp.task("copyNodeModules", () => {
  return gulp
    .src(nodeModulesCopyPath, copyNodeModuleOption)
    .pipe(gulp.dest(dist))
})

// 编译
let ts = require("gulp-typescript")
let tsProject = ts.createProject("tsconfig.json")
let sourcemaps = require("gulp-sourcemaps")
gulp.task("tsCompile", function () {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
})

//生产流程
gulp.task("build", gulp.series("clear", gulp.parallel("copy", "tsCompile")))
