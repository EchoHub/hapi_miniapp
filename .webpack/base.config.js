const HtmlWebpackPlugin = require("html-webpack-plugin")
// const CleanWebpackPlugin = require("clean-webpack-plugin")
const { entries, destPath } = require("../.build/default")
const path = require("path")
const rootPath = process.cwd();
const env = process.env.NODE_ENV;
module.exports = {
    mode: env,
    // watch: true,
    entry: entries,
    output: {
        path: destPath,
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json"],
        modules: ["./src/components", "./src/pages", "node_modules"],
        alias: {
            // components: path.resolve(__dirname, "components/"),
            // assets: path.resolve(__dirname, "assets/")
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    },
    // plugins: buildAxmlByHtmlWebpackPlugin().concat([
    //     // new CleanWebpackPlugin({
    //     //     root: __dirname,
    //     //     verbose: true,
    //     //     dry: false
    //     // })
    // ])
}
// function buildAxmlByHtmlWebpackPlugin() {
//     let htmlWebpackPluginList = []
//     for(const item in entries) {
//         const axml = new HtmlWebpackPlugin({
//             template: path.resolve(rootPath, "src/pages/_template/index.axml"),
//             filename: entries[item].replace(/^\.\/src\/([0-9a-zA-Z_\/]+)\.js$/, "$1"+ ".axml"),
//             title: "index",
//             chunks:[`index_${item.split("/").join("_")}`]
//         })
//         htmlWebpackPluginList.push(axml);
//     }
//     return htmlWebpackPluginList
// }