const Koa = require('koa');
const sourceMap = require('source-map');
const path = require('path');
const fs = require('fs');
const history = require('connect-history-api-fallback');
const staticServer = require('koa-static');
const Router = require('koa-router');

const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
app.use(staticServer(path.join(__dirname,'dist')))
// app.use(staticServer(__dirname + ‘/static’));
/* 接收map文件的接口 */
router.post("/upload", async (ctx) => {
    console.log('上传map文件');
    const stream = ctx.req;
    const filename = ctx.query.name;
    let dir = path.join(__dirname, "source-map");
    //判断source文件夹是否存在
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let target = path.join(dir, filename);
    const ws = fs.createWriteStream(target);
    stream.pipe(ws);
});

/* 接收错误信息的接口 */
router.get("/error", async (ctx) => {
    console.log('接收错误信息');
    const errInfo = ctx.query.info;
    // 转码 反序列化
    let obj = JSON.parse(Buffer.from(errInfo, "base64").toString("utf-8"));
  
    let fileUrl = obj.filename.split("/").pop() + ".map"; // map文件路径
    // 解析sourceMap
    // 1.sourcemap文件的文件流，我们已经上传 
    // 2.文件编码格式
    let consumer = await new sourceMap.SourceMapConsumer(
      fs.readFileSync(path.join(__dirname, "source-map/" + fileUrl), "utf8")
    );
    // 解析原始报错数据
    let result = consumer.originalPositionFor({
      line: obj.lineno, // 压缩后的行号
      column: obj.colno, // 压缩后的列号
    });
    // 写入到日志中
    obj.lineno = result.line;
    obj.colno = result.column;
    log4js.logError(JSON.stringify(obj));
    ctx.body = "";
  });
  app.use(router.routes());

  app.use(history())

app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功了');
})