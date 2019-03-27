const path = require("path")
const fs = require('fs');
const srcPath = path.resolve(__dirname, "./../src")
const destPath = path.resolve(__dirname, "./../dist")
const join = path.join;

function findSync(startPath) {
    let entries = {};
    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile() && /index.js$/.test(val)) {
                const key = fPath.replace(/(^src\/([0-9a-zA-Z_\/]+).js$)/, "$2")
                entries[key] = `./${fPath}`
            }
        });
    }
    finder(startPath);
    return entries
}
const entries = findSync('src/pages');
let a_componentsEntries = []
let j_componentsEntries = []
let l_componentsEntries = []
for(const item in entries) {
    const jsonPath = path.resolve(__dirname, `./../${entries[item]}`).replace(/\.js$/, ".json")
    const json = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf-8'}));
    const usingComponents = json.usingComponents || {};
    for(const ite in usingComponents) {
        const name = usingComponents[ite].replace(/^\//, "")
        entries[`components/${ite}/index`] = `./src/${name}.js`
        a_componentsEntries.push(path.resolve(__dirname, `./../src/${name}.axml`))
        j_componentsEntries.push(path.resolve(__dirname, `./../src/${name}.json`))
        l_componentsEntries.push(path.resolve(__dirname, `./../src/${name}.less`))
    }
}
entries["app"] = `./src/app.js`
module.exports = {
    entries: entries,
    common: {
        srcPath: srcPath,
        destPath: destPath,
        imageSrc: path.resolve(srcPath, "assets/static/**/*.*"),
        imageDest: path.resolve(destPath, "assets/static"),
        mixinExt: [".json", ".axml"],
        mixinDirs: [
            {
                src: path.resolve(srcPath, "pages/**/*.*"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.*"),
                dest: path.join(destPath, "components"),
            }
        ],
        jsonDirs: [
            {
                src: path.resolve(srcPath, "app.json"),
                dest: destPath,
            },
            {
                src: path.resolve(srcPath, "pages/**/*.json"),
                dest: path.join(destPath, "pages"),
            }
        ].concat(j_componentsEntries.length ? [{
            src: j_componentsEntries,
            dest: path.join(destPath, "components"),
        }]: []),
        axmlDirs: [
            {
                src: path.resolve(srcPath, "pages/**/*.axml"),
                dest: path.join(destPath, "pages"),
            }
        ].concat(a_componentsEntries.length ? [{
            src: a_componentsEntries,
            dest: path.join(destPath, "components"),
        }] : []),
        lessDirs: [
            {
                src: path.resolve(srcPath, "app.less"),
                dest: destPath,
            },
            {
                src: path.resolve(srcPath, "pages/**/*.less"),
                dest: path.join(destPath, "pages"),
            }
        ].concat(l_componentsEntries.length ? [{
            src: l_componentsEntries,
            dest: path.join(destPath, "components"),
        }] : []),
        jsDirs: [
            {
                src: path.resolve(srcPath, "app.js"),
                dest: destPath
            },
            {
                src: path.resolve(srcPath, "pages/**/*.js"),
                dest: path.join(destPath, "pages"),
            },
            {
                src: path.resolve(srcPath, "components/**/*.js"),
                dest: path.join(destPath, "components")
            }
        ]
    },
    prod: {

    },
    dev: {
    }
}