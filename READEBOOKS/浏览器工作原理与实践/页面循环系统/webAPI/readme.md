### 16 | WebAPI：setTimeout是如何实现的？

## 浏览器怎么实现 setTimeout
    在 Chrome 中除了正常使用的消息队列之外，还有另外一个消息队列，这个队列中维护了需要延迟执行的任务列表，包括了定时器和 Chromium 内部一些需要延迟执行的任务。所以当通过 JavaScript 创建一个定时器时，渲染进程会将该定时器的回调任务添加到延迟队列中。

# 使用 setTimeout 的一些注意事项
1. 如果当前任务执行时间过久，会影延迟到期定时器任务的执行
2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒
3. 未激活的页面，setTimeout 执行最小间隔是 1000 毫秒
4. 延时执行时间有最大值
5. 使用 setTimeout 设置的回调函数中的 this 不符合直觉


### 17 | WebAPI：XMLHttpRequest是怎么实现的？

## 回调函数 VS 系统调用栈
- 什么是回调函数呢（Callback Function）
    将一个函数作为参数传递给另外一个函数，那作为参数的这个函数就是回调函数。
    1. 回调函数是在主函数返回之前执行的，我们把这个回调过程称为**同步回调**。
    2. 回调函数在主函数外部执行的过程称为**异步回调**。

- 循环系统在执行一个任务的时候，都要为这个任务维护一个**系统调用栈**。这个系统调用栈类似于 JavaScript 的调用栈，只不过系统调用栈是 Chromium 的开发语言 C++ 来维护的。

- 异步回调过程:
    1. 第一种是把异步函数做成一个任务，添加到信息队列尾部；
    2. 第二种是把异步函数添加到微任务队列中，这样就可以在当前任务的末尾处执行微任务了。

# XMLHttpRequest 运作机制
```js
function GetWebData(URL){
    /**
     * 1: 新建 XMLHttpRequest 请求对象
     */
    let xhr = new XMLHttpRequest()

    /**
     * 2: 注册相关事件回调处理函数 
     */
    xhr.onreadystatechange = function () {
        switch(xhr.readyState){
          case 0: // 请求未初始化
            console.log(" 请求未初始化 ")
            break;
          case 1:// OPENED
            console.log("OPENED")
            break;
          case 2:// HEADERS_RECEIVED
            console.log("HEADERS_RECEIVED")
            break;
          case 3:// LOADING  
            console.log("LOADING")
            break;
          case 4:// DONE
            if(this.status == 200||this.status == 304){
                console.log(this.responseText);
                }
            console.log("DONE")
            break;
        }
    }
 
    xhr.ontimeout = function(e) { console.log('ontimeout') }
    xhr.onerror = function(e) { console.log('onerror') }
 
    /**
     * 3: 打开请求
     */
    xhr.open('Get', URL, true);// 创建一个 Get 请求, 采用异步
 
    /**
     * 4: 配置参数
     */
    xhr.timeout = 3000 // 设置 xhr 请求的超时时间
    xhr.responseType = "text" // 设置响应返回的数据格式
    xhr.setRequestHeader("X_TEST","time.geekbang")
 
    /**
     * 5: 发送请求
     */
    xhr.send();
}
```
- 第一步：创建 XMLHttpRequest 对象。
- 第二步：为 xhr 对象注册回调函数。
    1. ontimeout，用来监控超时请求，如果后台请求超时了，该函数会被调用；
    2. onerror，用来监控出错信息，如果后台请求出错了，该函数会被调用；
    3. onreadystatechange，用来监控后台请求过程中的状态，比如可以监控到 HTTP 头加载完成的消息、HTTP 响应体消息以及数据加载完成的消息等。
- 第三步：配置基础的请求信息。
- 第四步：发起请求。

# XMLHttpRequest 使用过程中的“坑”
  1. 跨域问题
  2. HTTPS 混合内容的问题
    HTTPS 混合内容是 HTTPS 页面中包含了不符合 HTTPS 安全要求的内容，比如包含了 HTTP 资源，通过 HTTP 加载的图像、视频、样式表、脚本等，都属于混合内容。
    浏览器认为这种请求可能是攻击者发起的，会阻止此类危险的请求。