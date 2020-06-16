### 19 | Promise：使用Promise，告别回调函数

# 异步编程的问题：代码逻辑不连续
异步回调：
    页面主线程发起了一个耗时的任务，并将任务交给另外一个进程去处理，这时页面主线程会继续执行消息队列中的任务。等该进程处理完这个任务后，会将该任务添加到渲染进程的消息队列中，并排队等待循环系统的处理。排队结束之后，循环系统会取出消息队列中的任务进行处理，并触发相关的回调操作。


# 封装异步代码，让处理流程变得线性
```js
//makeRequest 用来构造 request 对象
function makeRequest(request_url) {
    let request = {
        method: 'Get',
        url: request_url,
        headers: '',
        body: '',
        credentials: false,
        sync: true,
        responseType: 'text',
        referrer: ''
    }
    return request
}

//[in] request，请求信息，请求头，延时值，返回类型等
//[out] resolve, 执行成功，回调该函数
//[out] reject  执行失败，回调该函数
function XFetch(request, resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.ontimeout = function (e) { reject(e) }
    xhr.onerror = function (e) { reject(e) }
    xhr.onreadystatechange = function () {
        if (xhr.status = 200)
            resolve(xhr.response)
    }
    xhr.open(request.method, URL, request.sync);
    xhr.timeout = request.timeout;
    xhr.responseType = request.responseType;
    // 补充其他请求信息
    //...
    xhr.send();
}

// 业务代码
XFetch(makeRequest('https://time.geekbang.org'),
    function resolve(data) {
        console.log(data)
    }, function reject(e) {
        console.log(e)
    })
```

- 新的问题：回调地狱
    1. 第一是嵌套调用，下面的任务依赖上个任务的请求结果，并在上个任务的回调函数内部执行新的业务逻辑，这样当嵌套层次多了之后，代码的可读性就变得非常差了。
    2. 第二是任务的不确定性，执行每个任务都有两种可能的结果（成功或者失败）

## Promise：消灭嵌套调用和多次错误处理
```js
function XFetch(request) {
  function executor(resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', request.url, true)
      xhr.ontimeout = function (e) { reject(e) }
      xhr.onerror = function (e) { reject(e) }
      xhr.onreadystatechange = function () {
          if (this.readyState === 4) {
              if (this.status === 200) {
                  resolve(this.responseText, this)
              } else {
                  let error = {
                      code: this.status,
                      response: this.response
                  }
                  reject(error, this)
              }
          }
      }
      xhr.send()
  }
  return new Promise(executor)
}

var x1 = XFetch(makeRequest('https://time.geekbang.org/?category'))
var x2 = x1.then(value => {
    console.log(value)
    return XFetch(makeRequest('https://www.geekbang.org/column'))
})
var x3 = x2.then(value => {
    console.log(value)
    return XFetch(makeRequest('https://time.geekbang.org'))
})
x3.catch(error => {
    console.log(error)
})
```
1. Promise 实现了回调函数的延时绑定。
2. 需要将回调函数 onResolve 的返回值穿透到最外层。

# Promise 与微任务


思考题：
1. Promise 中为什么要引入微任务？
2. Promise 中是如何实现回调函数返回值穿透的？
3. Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？