const fs = require('fs')
const path = require('path')
const readline = require('readline')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const gulpwatch = require('gulp-watch')
const minimist = require('minimist')
const rename = require('gulp-rename')
const pump = require('pump')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

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
    return pump([
      gulp.src(dir.src),
      less({
        plugins: [autoprefix]
      }),
      gulpif(env === 'production', cleanCss()),
      rename({
        extname: '.acss'
      }),
      gulp.dest(`${dir.dest}${dir.src.indexOf("components/") > -1 ? `/${compPath}` : ""}`)
    ], function (err) {
    })
  })
})
gulp.task('axml:compile', async function () {
  const { axmlDirs } = glob.updateEntries()
  axmlDirs.map((dir, index) => {
    const compPath = dir.src.replace(/[\w\/\-\.]+components\/([0-9a-zA-Z_\-\.]+)\/index\.[a-z]+$/, "$1")
    return pump([
      gulp.src(dir.src),
      rename({
        extname: '.html'
      }),
      gulpif(env === 'production', htmlmin({ collapseWhitespace: true })),
      rename({
        extname: '.axml'
      }),
      gulp.dest(`${dir.dest}${dir.src.indexOf("components/") > -1 ? `/${compPath}` : ""}`)
    ], function (err) {
    })
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
      eslint.format(),
      gulpif(env === 'production', uglify()),
      gulp.dest(dir.dest)
    ], function (err) {
    })
  })
})
gulp.task("build:dev", gulp.series("clean", gulp.parallel(["less:compile", "axml:compile", "json:compile", "assets:compile", "js:compile"])))
gulp.task('server:watch', gulp.series('build:dev', function () {
  const { jsDirs, imageSrc, mixinDirs } = glob['common']
  let { lessDirs, axmlDirs, jsonDirs } = glob.updateEntries()
  gulpwatch(imageSrc, assetsCompile)
  const _lessDirs = (env === "production" ? lessDirs: mixinDirs).map(dir => {
    return dir.src
  })
  gulp.watch(_lessDirs, gulp.series('less:compile'))
  const _axmlDirs = (env === "production" ? axmlDirs : mixinDirs).map(dir => {
    return dir.src
  })
  gulp.watch(_axmlDirs, gulp.series('axml:compile'))
  const _jsonDirs = (env === "production" ? jsonDirs : mixinDirs).map(dir => {
    return dir.src
  })
  gulp.watch(_jsonDirs, gulp.series('json:compile', gulp.parallel(["less:compile", "axml:compile", "js:compile"])))

  const _jsDirs = jsDirs.map(dir => {
    return dir.src
  })
  gulp.watch(_jsDirs, gulp.series('js:compile'))
}))
function HapiUtil() {
  const { name } = minimist(process.argv.slice(2), knownOptions)
  this.name = name
}
HapiUtil.prototype = {
  build: async function (type) {
    const name = this.name
    const nameArr = name.split('/')
    const fileName = nameArr[nameArr.length - 1]
    let filePath = null
    if (nameArr.length > 1) {
      filePath = nameArr.slice(0, nameArr.length - 1).join('/')
    }
    const destPath = path.join(__dirname, `src/${type}/${filePath ? `${filePath}/${fileName}` : fileName}`)
    const hasExist = fs.existsSync(destPath);
    if (!hasExist && type === "pages") {
      const appPath = "./src/app.json";
      const appConfig = JSON.parse(fs.readFileSync(appPath, { encoding: "utf-8" }));
      appConfig.pages.push(`pages/${filePath ? `${filePath}/${fileName}` : fileName}/index`)
      const appConfigStr = JSON.stringify(appConfig, null, "\t");
      fs.writeFileSync(appPath, appConfigStr)
    }
    const start = +new Date()
    return pump([
      gulp.src(path.join(__dirname, `src/${type}/_template/*.*`)),
      gulpif(!hasExist,
        gulp
          .dest(destPath)
          .on("end", function () {
            const lessFile = fs.readFileSync(`${destPath}/index.less`, { encoding: "utf-8" });
            fs.writeFileSync(`${destPath}/index.less`, lessFile.replace(/\.hp-_template/g, `.${fileName.toLowerCase()}`))
            const axmlFile = fs.readFileSync(`${destPath}/index.axml`, { encoding: "utf-8" });
            fs.writeFileSync(`${destPath}/index.axml`, axmlFile.replace(/hp-_template/g, fileName.toLowerCase()))
            if (type === "components") {
              const pkgFile = fs.readFileSync(`${destPath}/package.json`, { encoding: "utf-8" });
              fs.writeFileSync(`${destPath}/package.json`, pkgFile.replace(/_template/g, fileName.toLowerCase()))
            }
            console.log(`创建成功: ${type}/${fileName}`.green);
            console.log(`耗时: ${(+new Date() - start) / 1000}ms`.green);
          }))
    ])
  },
  remove: async function () {
    const destPath = path.join(__dirname, `src/${this.name}`)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    return rl.question(`您当前正在进行删除操作\n删除路径：${destPath}\n是否继续,Yes or No?`.red, answer => {
      if (answer.toUpperCase() === "YES" || answer.toUpperCase() === "Y") {
        if (/^pages/.test(this.name)) {
          const appPath = "./src/app.json";
          const appConfig = JSON.parse(fs.readFileSync(appPath, { encoding: "utf-8" }));
          let index = 0;
          for (const item of appConfig.pages) {
            if (item === `${this.name}/index`) {
              appConfig.pages.splice(index, 1);
              break;
            }
            index++
          }
          const appConfigStr = JSON.stringify(appConfig, null, "\t");
          fs.writeFileSync(appPath, appConfigStr)
        }
        const start = +new Date()
        rimraf.sync(destPath)
        console.log(`删除成功: ${this.name}`.green);
        console.log(`耗时: ${(+new Date() - start) / 1000}ms`.green);
      }
      process.exit(0)
    })
  }
}
gulp.task('new', function () {
  // gulp new --name xxx
  return (new HapiUtil()).build('components')
})
gulp.task('create', function () {
  // gulp create --name xxx
  return (new HapiUtil()).build('pages')
})
gulp.task('remove', function () {
  return (new HapiUtil()).remove()
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

gulp.task('api', function () {
  rimraf.sync(`./src/components/api`)
  apiBuild().then(apis => apis.map(api => anazApis(api)))
})
async function apiBuild() {
  const apis = await require('./api')
  // api集合筛选
  const { index } = minimist(process.argv.slice(2), knownOptions)
  let _apis = apis
  if (index !== undefined && apis[index]) {
    _apis = apis[index]
  }
  const _apiArr = (_apis instanceof Array ? _apis : [_apis])
  let result = []
  for (const item of _apiArr) {
    result = result.concat(item.list)
  }
  return result
}
function anazApis(api) {
  const method = api.method
  const path = api.path
  let headers = {}
  if (api.req_headers && api.req_headers.length) {
    for (const item of api.req_headers) {
      headers[item.name] = item.value
    }
  }
  //   const queryParam = api.req_query
  const dataType = api.res_body_type
  const options = {
    url: path,
    headers: headers,
    method,
    dataType
  }
  const paths = path.split('/')
  const funcName = paths[paths.length - 1]
  const content = `export function ${funcName === 'delete' ? 'delete_1' : funcName}(query, success, fail, complete, others) {
    const options = Object.assign({}, ${JSON.stringify(options)}, {data: query}, others, {
        success: success,
        fail: fail || function(err){
            my.showToast({
                type: 'fail',
                content: err.msg || '系统异常,请稍后再试'
            })
        },
        complete: complete,
    })
    return my.request(options)
}
`
  let dirPath = './src/components/api'
  if (paths.length - 3 >= 0) {
    dirPath += `${paths.slice(0, paths.length - 3).join('/')}`
  }
  mkdirp(dirPath, err => {
    if (err) console.error(err)
    else {
      const fileName = paths.length - 3 >= 0 ? paths[paths.length - 2] : 'api'
      fs.appendFile(`${dirPath.concat(`/${fileName}`)}.js`, content, 'utf-8', error => {
        if (error) console.error(error)
      })
    }
  })
}
