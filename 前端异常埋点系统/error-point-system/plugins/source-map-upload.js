const fs = require("fs");
const http = require("http");
const path = require("path");
class SourceMapUploader {
  constructor(options) {
    this.options = options;
  }
  /**
   * 用到了hooks，done表示在打包完成之后
   * status.compilation.outputOptions就是打包的dist文件
   */
  apply(compiler) {
    if (process.env.NODE_ENV == "production") {
      compiler.hooks.done.tap("sourcemap-uploader", async (status) => {
        // console.log(status.compilation.outputOptions.path);
        // 读取目录下的map后缀的文件
        let dir = path.join(status.compilation.outputOptions.path, "/js/");
        let chunks = fs.readdirSync(dir);
        let map_file = chunks.filter((item) => {
          return item.match(/\.js\.map$/) !== null;
        });
        // 上传sourcemap
        while (map_file.length > 0) {
          let file = map_file.shift();
          await this.upload(this.options.url, path.join(dir, file));
        }
      });
    }
  }
  
  //调用upload接口，上传文件
  upload(url, file) {
    return new Promise((resolve) => {
      let req = http.request(`${url}?name=${path.basename(file)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          Connection: "keep-alive",
        },
      });

      /* 当我们学习新知识的时候，首先我们知道为什么要学习，那我们为什么要学习流?因为在在node中读取文件的方式有来两种，一个是利用fs模块，一个是利用流来读取。
         如果读取小文件，我们可以使用fs读取，fs读取文件的时候，是将文件一次性读取到本地内存。而如果读取一个大文件，一次性读取会占用大量内存，效率很低，这个时候需要用流来读取。
         流是将数据分割段，一段一段的读取，可以控制速率,效率很高,不会占用太大的内存。
         gulp的task任务，文件压缩，和http中的请求和响应等功能的实现都是基于流来实现的。
         因此，系统学习下流还是很有必要的
       */
      /* node中fs的使用， */
      let fileStream = fs.createReadStream(file);
      /* 可以通过使用可读流的函数pipe()接入到可写流中
          pipe()是一种很高效的数据处理方式 */
      fileStream.pipe(req, { end: false });
      fileStream.on("end", function() {
        req.end();
        resolve();
      });
    });
  }
}
module.exports = SourceMapUploader;