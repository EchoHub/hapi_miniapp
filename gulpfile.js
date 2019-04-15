const gulp = require('gulp')
const gulpif = require('gulp-if')
const gulpwatch = require('gulp-watch')
const minimist = require('minimist')
const rename = require('gulp-rename')
const pump = require('pump')
const rimraf = require('rimraf')

const webpack = require("webpack")

const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new LessAutoprefix({ browsers: ['> 1%'] })
const cleanCss = require('gulp-clean-css')

const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default

const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')

const jsonmin = require('gulp-jsonmin')

const htmlmin = require('gulp-htmlmin')

const glob = require('./.build/default')
  ; require('colors')

const HapiUtil = require("./.build/hapi")
const knownOptions = {
  // string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
}
const env = process.env.NODE_ENV;

gulp.task('clean', async function () {
  const { destPath } = glob['common']
  rimraf.sync(destPath)
})
gulp.task('less:compile', async function () {
  const { lessDirs } = glob.updateEntries()
  return lessDirs.map((dir, index) => {
    const compPath = dir.src.replace(/[\w\/\-\.]+components\/([0-9a-zA-Z_\-\.]+)\/index\.[a-z]+$/, "$1")
    const destUrl = `${dir.dest}${dir.src.indexOf("components/") > -1 ? `/${compPath}` : ""}`;
    return pump([
      gulp.src(dir.src),
      less({
        plugins: [autoprefix]
      }),
      gulpif(env === 'production', cleanCss()),
      rename({
        extname: '.acss'
      }),
      gulp.dest(destUrl),
    ], function (err) { })
  })
})
gulp.task('axml:compile', async function () {
  const { axmlDirs } = glob.updateEntries()
  axmlDirs.map((dir, index) => {
    const compPath = dir.src.replace(/[\w\/\-\.]+components\/([0-9a-zA-Z_\-\.]+)\/index\.[a-z]+$/, "$1")
    const destUrl = `${dir.dest}${dir.src.indexOf("components/") > -1 ? `/${compPath}` : ""}`;
    return pump([
      gulp.src(dir.src),
      rename({
        extname: '.html'
      }),
      // gulpif(env === 'production', htmlmin({ collapseWhitespace: true })),
      rename({
        extname: '.axml'
      }),
      gulp.dest(destUrl)
    ])
  })
})
gulp.task('json:compile', async function () {
  const { jsonDirs } = glob.updateEntries()
  jsonDirs.map((dir, index) => {
    const compPath = dir.src.replace(/[\w\/\-\.]+components\/([0-9a-zA-Z_\-\.]+)\/index\.[a-z]+$/, "$1")
    return pump([
      gulp.src(dir.src),
      gulpif(env === 'production', jsonmin()),
      gulp.dest(`${dir.dest}${dir.src.indexOf("components/") > -1 ? `/${compPath}` : ""}`)
    ], function (err) {
    })
  })
})
gulp.task('assets:compile', assetsCompile)
gulp.task("build", gulp.series("clean", gulp.series(gulp.parallel(["less:compile", "axml:compile", "json:compile", "assets:compile"]), async function () {

  return new Promise((resolve, rejects) => {
    webpack(require("./webpack.config"), function (err, stats) {
      resolve()
    })
  })
})))
gulp.task('js:compile', async function () {
  const { jsDirs } = glob['common']
  jsDirs.map(dir => {
    return pump([
      gulp.src(dir.src),
      babel(),
      gulpif(env === 'production', uglify()),
      gulp.dest(dir.dest)
    ], function (err) {
      console.log(err);
    })
  })
})
gulp.task("build:dev", gulp.series("clean", gulp.parallel(["less:compile", "axml:compile", "json:compile", "assets:compile", "js:compile"])))
gulp.task('server:watch', gulp.series('build:dev', function () {
  const { jsDirs, imageSrc } = glob['common']
  const { lessDirs, axmlDirs, jsonDirs } = glob.updateEntries()
  gulpwatch(imageSrc, assetsCompile)
  const _lessDirs = lessDirs.map(dir => {
    return dir.src
  })
  gulp.watch(_lessDirs, gulp.series('less:compile'))
  const _axmlDirs = axmlDirs.map(dir => {
    return dir.src
  })
  gulp.watch(_axmlDirs, gulp.series('axml:compile'))
  const _jsonDirs = jsonDirs.map(dir => {
    return dir.src
  })
  gulp.watch(_jsonDirs, gulp.series('json:compile', gulp.parallel(["less:compile", "axml:compile", "js:compile"])))

  const _jsDirs = jsDirs.map(dir => {
    return dir.src
  })
  gulp.watch(_jsDirs, gulp.series('js:compile'))
}))
gulp.task('new', gulp.series(function () {
  // gulp new --name xxx
  return (new HapiUtil()).build('components')
}, gulp.parallel(["less:compile", "axml:compile", "json:compile", "assets:compile", "js:compile"])))
gulp.task('create', function () {
  // gulp create --name xxx
  return (new HapiUtil()).build('pages')
})
gulp.task('remove', function () {
  return (new HapiUtil()).remove()
})
gulp.task('api', async function () {
  return (new HapiUtil()).api()
})
async function assetsCompile() {
  const { imageSrc, imageDest } = glob['common']
  const { env } = minimist(process.argv.slice(2), knownOptions)
  rimraf.sync(imageDest)
  return pump([
    gulp.src(imageSrc),
    gulpif(env === 'production', imagemin({
      optimizationLevel: 7,
      progressive: true,
      use: [pngquant(), imageminJpegtran()]
    })),
    gulp.dest(imageDest)
  ])
}