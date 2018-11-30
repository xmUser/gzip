# gzip

1. <code> npm install </code>
2. 启动nginx (双击文件夹nginx-1.15.7下的nginx.exe)
3. cmd切到根目录gzip
4. 执行命令: <code>node http.js </code> <br>
输出 server start 8181 即成功开启服务器
5. 打开浏览器，地址栏输入 127.0.0.1:8181，将出现高度自适应页面

## 开启nginx gzip
```js
gzip  on;  #开启gzip
gzip_min_length 1k;  #低于1kb的资源不压缩
gzip_comp_level 3; #压缩级别【1-9】，越大压缩率越高，同时消耗cpu资源也越多，建议设置在4左右。
gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;  #需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片，下面会讲为什么。
gzip_disable "MSIE [1-6]\.";  #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
gzip_vary on;  #是否添加“Vary: Accept-Encoding”响应头
```
