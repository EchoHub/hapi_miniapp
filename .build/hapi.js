const gulp = require('gulp')
const gulpif = require('gulp-if')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const minimist = require('minimist')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const pump = require('pump')

const apis = require('./../api')
const glob = require('./default')
const knownOptions = {
    default: { env: process.env.NODE_ENV || 'development' }
}
function HapiUtil() {
    const { name } = minimist(process.argv.slice(2), knownOptions)
    this.name = name
    this.apis = apis 
    this.anazApis = function anazApis(api) {
        const { server } = minimist(process.argv.slice(2), knownOptions)
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
            url: (server === 'test' ? glob.testServer :
                server === "dev" ? glob.devServer : (glob.prodServer || '')) + path,
            headers: headers,
            method,
            dataType
        }
        const paths = (path.replace(/^\//, "")).split('/')
        const funcName = paths[paths.length - 1]
        const content = `export function ${funcName === 'delete' ? 'delete_1' : funcName}(query, success, fail, complete, others) {
    const app = getApp();
    const config = Object.assign({}, ${JSON.stringify(options)},{ headers: Object.assign({}, ${JSON.stringify(options.headers)}, { atk: query.atk})})
    delete query.atk
    let _query = query;
    config.headers["content-type"] = config.headers["Content-Type"]
    if(config.headers["content-type"] === "application/json" ) {
    _query = JSON.stringify(_query)
    }
    delete config.headers["Content-Type"]
    const _others = Object.assign({timeout: 3000}, others);
    const options = Object.assign({}, config, {data: _query}, _others, {
        success: resp => {
        const data = resp.data || {}
        if (data.code == '0') {
            success && success(data.data, data)
        } else if (data.code == '50102') {
            // token失效 重新获取鉴权 重新调用数据
            app.checkAuth('auth_base').then(({ token = '' }) => {
            // 数据更新
            app.CONSTANTS.atk = token
            my.request(Object.assign({}, ${JSON.stringify(options)}, {data: query}, others,
            {
                success: responese => {
                const data_ = responese.data || {}
                success(data_.data, data_)
                },
                fail: fail || function(err){
                    my.showToast({
                        type: 'fail',
                        content: err.msg || '系统异常,请稍后再试'
                    })
                },
                complete: complete
            }
            ))
            }).catch((e) => {
            my.showToast({ content: '系统异常' })
            })
        }else {
            fail(data, resp)
        }
        },
        fail: fail || function(err, resp){
            my.showToast({
                type: 'fail',
                content: err.msg || '系统异常,请稍后再试'
            })
        },
        complete: complete,
    })
    return (my.httpRequest || my.request)(options)
}
`
        let dirPath = './src/components/api/'
        if (paths.length - 2 > 0) {
            dirPath += `${paths.slice(0, paths.length - 2).join('/')}`
        }
        mkdirp(dirPath, err => {
            if (err) console.error(err)
            else {
                const fileName = paths.length - 2 >= 0 ? paths[paths.length - 2] : 'api'
                fs.appendFile(`${dirPath.concat(`/${fileName}`)}.js`, content, 'utf-8', error => {
                    if (error) console.error(error)
                })
            }
        })
        // 生成 mock 数据
        let mockPath = './mock/'
        if (paths.length > 1) mockPath += paths.slice(0, paths.length - 1).join("/")
        const fileName = paths[paths.length - 1];
        ; (new MockFactory(mockPath, fileName, api.res_body)).build()
    }

    function MockFactory(path, fileName, resBody) {
        this.path = path;
        this.fileName = fileName;
        this.resBody = resBody;
    }
    MockFactory.prototype = {
        build: function () {
            mkdirp(this.path, err => {
                if (err) console.error(err)
                else {
                    const content = this.buildMockData(JSON.parse(this.resBody)).replace(/\\\"/g, "")
                    const fw = fs.createWriteStream(`${this.path.concat(`/${this.fileName}`)}.json`, {
                        flags: 'w',
                        defaultEncoding: 'utf8',
                    })
                    fw.write(content, () => {
                        fw.close()
                    })
                }
            })
        },
        buildValueByDataType: function (key, dataObj) {
            const type = dataObj.type;
            switch (type) {
                case "string":
                    return `"${key}_${Math.floor(Math.random() * 10)}"`;
                case "number":
                    return Math.floor(Math.random() * 10);
                case "array":
                    let a_result = new Array()
                    const items = dataObj.items;
                    const count = Math.floor(Math.random() * 15)
                    for (let i = 0; i < count; i++) {
                        a_result.push(this.buildValueByDataType(null, items))
                    }
                    return a_result;
                case "object":
                    let o_result = new Object()
                    const properties = dataObj.properties;
                    for (const key in properties) {
                        o_result[key] = this.buildValueByDataType(key, properties[key])
                    }
                    return o_result;
                default:
                    // console.log("default", dataObj)
                    return null;
            }
        },
        buildMockData: function (body) {
            const properties = body.properties;
            const data = properties["data"];
            let obj = new Object()
            if (data) obj = this.buildValueByDataType("data", data)
            const result = {
                "code": 0,
                "data": data ? obj : null,
                "msg": "mock请求成功",
                "success": true
            }
            return JSON.stringify(result, null, 4)
        }
    }
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
        const destPath = path.join(__dirname, `./../src/${type}/${filePath ? `${filePath}/${fileName}` : fileName}`)
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
            gulp.src(path.join(__dirname, `../src/${type}/_template/*.*`)),
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
        const destPath = path.join(__dirname, `../src/${this.name}`)
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
    },
    api: async function () {
        rimraf.sync(`./src/components/api`)
        rimraf.sync(`./mock`)
        const apis = this.apis;
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
        result.map(api => this.anazApis(api))
        // return result
    }
}
module.exports = HapiUtil