// 引入依赖
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");

// 创建服务器
const server = http.createServer((req, res) => {
    // 处理 pathname，"/" 时默认读取 "/index.html"
    let { pathname } = url.parse(req.url, true);
    pathname = pathname !== "/" ? pathname : "/webroot/index.html";

    // 获取读取文件的绝对路径
    let p = path.join(__dirname, pathname);

    // 查看路径是否合法
    fs.access(p, err => {
        // 路径不合法则直接中断连接
        if (err) return res.end("Not Found");

        // 获取浏览器支持的压缩格式
        let encoding = req.headers["accept-encoding"];

        // 创建可读流
        let rs = fs.createReadStream(p);

        let compress;
        let compressType;
        // 支持 gzip 使用 gzip 压缩，支持 deflate 使用 deflate 压缩
        if (encoding && encoding.match(/\bgzip\b/)) {
            compress = zlib.createGzip();
            compressType = "gzip";
        } else if (encoding && encoding.match(/\bdeflate\b/)) {
            compress = zlib.createDeflate();
            compressType = "deflate";
        } else {
            // 否则直接返回可读流
            return rs.pipe(res);
        }

        // 将压缩流返回并设置响应头
        res.setHeader("Content-Encoding", compressType);
        rs.pipe(compress).pipe(res);
    });
});

server.listen(8181, () => {
    console.log("server start 8181");
});