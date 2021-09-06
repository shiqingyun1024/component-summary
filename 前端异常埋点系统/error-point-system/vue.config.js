/* webpack是由node编写的，所以遵循common.js规范 */
const {resolve} = require('path')
let SourceMapUploader = require("./plugins/source-map-upload");
module.exports = {
    productionSourceMap: true,
    devServer:{
        open:true,
        port:8090
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
            },
        },
        plugins: [
             new SourceMapUploader({url: "http://localhost:3000/upload"})
        ],
    }
}