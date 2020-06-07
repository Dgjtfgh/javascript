var i = 10, root = {index: "NONE"}, node = root;  // 创建链表
while (i > 0) { 
    node.next = node = new Object;
    console.log(root.next, '---')
    node.index = i--; // 这里可以开始给新 node 添加成员
    console.log(node)

} 
console.log(node.next, '+++')
// 测试
node = root; 
console.log(node)
console.log(node.next)
while (node = node.next) { 
    console.log(node.index);
}


