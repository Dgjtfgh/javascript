### 05 | 渲染流程（上）：HTML、CSS和JavaScript，是如何变成页面的？

- 渲染模块在执行过程中会被划分为很多子阶段
    按照渲染的时间顺序，流水线可分为如下几个子阶段：构建 DOM 树、样式计算、布局阶段、分层、绘制、分块、光栅化和合成。

- 每个子节段又分三步：
    1. 输入内容
    2. 处理过程
    3. 输出内容

# 构建 DOM 树
  **因为浏览器无法直接理解和使用 HTML，所以需要将 HTML 转换为浏览器能够理解的结构——DOM 树**。

# 样式计算（Recalculate Style）
  1. 把 CSS 转换为浏览器能够理解的结构
    - CSS 样式来源主要有三种：
        1. 通过 link 引用的外部 CSS 文件
        2. <style>标记内的 CSS
        3. 元素的 style 属性内嵌的 CSS
    浏览器也是无法直接理解这些纯文本的 CSS 样式，所以**当渲染引擎接收到 CSS 文本时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构——styleSheets。**
  2. 转换样式表中的属性值，使其标准化
    CSS 文本中有很多属性值，如 2em、blue、bold，这些类型数值不容易被渲染引擎理解，所以**需要将所有值转换为渲染引擎容易理解的、标准化的计算值**。
  3. 计算出 DOM 树中每个节点的具体样式
    - 涉及到 CSS 的继承规则和层叠规则了。
        1. CSS 继承就是每个 DOM 节点都包含有父节点的样式
        2. 层叠是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源的属性值的算法。它在 CSS 处于核心地位，CSS 的全称“层叠样式表”正是强调了这一点。

# 布局阶段
  **接下来就需要计算出 DOM 树中可见元素的几何位置，我们把这个计算过程叫做布局。**
  1. 创建布局树
    额外地构建一棵只包含可见元素布局树。
    - 操作
        1. 遍历 DOM 树中的所有可见节点，并把这些节点加到布局中；
        2. 而不可见的节点会被布局树忽略掉，如 head 标签下面的全部内容，再比如 body.p.span 这个元素，因为它的属性包含 dispaly:none，所以这个元素也没有被包进布局树。
  2. 布局计算
    计算布局树节点的坐标位置

# 分层
  因为页面中有很多复杂的效果，如一些复杂的 3D 变换、页面滚动，或者使用 z-indexing 做 z 轴排序等，为了更加方便地实现这些效果，**渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（LayerTree）**。
  **并不是布局树的每个节点都包含一个图层，如果一个节点没有对应的层，那么这个节点就从属于父节点的图层。**
  - 满足下面两点中任意一点的元素就可以被提升为单独的一个图层：
    1. 拥有层叠上下文属性的元素会被提升为单独的一层。
    2. 需要剪裁（clip）的地方也会被创建为图层。
        把 div 的大小限定为 200 * 200 像素，而 div 里面的文字内容比较多，文字所显示的区域肯定会超出 200 * 200 的面积，这时候就产生了剪裁。

# 图层绘制
  渲染引擎会把一个图层的绘制拆分成很多小的**绘制指令**，再把这些指令按照顺序组成一个待绘制列表  图 *绘制列表.png*
绘制列表只是用来记录绘制顺序和绘制指令的列表

# 栅格化（raster）操作
  实际上绘制操作是由渲染引擎中的合成线程来完成的
  - 图层的绘制列表准备好之后，主线程会把该绘制列表提交（commit）给合成线程
  - 合成线程会将图层划分为图块（tile）
  - 合成线程会按照 视口(用户可以看到的这个部分) 附近的图块来优先生成位图，实际生成位图的操作是由栅格化来执行的。**所谓栅格化，是指将图块转换为位图**。
    图块是栅格化执行的最小单位。渲染进程维护了一个栅格化的线程池，所有的图块栅格化都是在线程池内执行的
  - 栅格化过程都会使用 GPU 来加速生成，使用 GPU 生成位图的过程叫快速栅格化，或者 GPU 栅格化，生成的位图被保存在 GPU 内存中
    渲染进程把生成图块的指令发送给 GPU，然后在 GPU 中执行生成图块的位图，并保存在 GPU 的内存中。

# 合成和显示
  1. 所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——“DrawQuad”，然后将该命令提交给浏览器进程。
  2. 浏览器进程里面有一个叫 viz 的组件，用来接收合成线程发过来的 DrawQuad 命令，然后根据 DrawQuad 命令，将其页面内容绘制到内存中，最后再将内存显示在屏幕上。

## 过程总结
  1. 渲染进程将 HTML 内容转换为能够读懂的DOM 树结构。
  2. 渲染引擎将 CSS 样式表转化为浏览器可以理解的styleSheets，计算出 DOM 节点的样式。
  3. 创建布局树，并计算元素的布局信息。
  4. 对布局树进行分层，并生成分层树。
  5. 为每个图层生成绘制列表，并将其提交到合成线程。
  6. 合成线程将图层分成图块，并在栅格化线程池中将图块转换成位图。
  7. 合成线程发送绘制图块命令DrawQuad给浏览器进程。
  8. 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上。

#  更新了元素的几何属性（重排）
    通过 JavaScript 或者 CSS 修改元素的几何位置属性，例如改变元素的宽度、高度等，那么浏览器会触发重新布局，解析之后的一系列子阶段。
  **重排需要更新完整的渲染流水线，所以开销也是最大的。**

# 更新元素的绘制属性（重绘）
    如果修改了元素的背景颜色，那么布局阶段将不会被执行，因为并没有引起几何位置的变换，所以就直接进入了绘制阶段，然后执行之后的一系列子阶段。
  **重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。**

# 直接合成阶段
    渲染引擎将跳过布局和绘制，只执行后续的合成操作。
  使用了 CSS 的 *transform* 来实现动画效果，这可以避开重排和重绘阶段，直接在非主线程上执行合成动画操作
  **相对于重绘和重排，合成能大大提升绘制效率。**  因为是在非主线程上合成，并没有占用主线程的资源，另外也避开了布局和绘制两个子阶段。
