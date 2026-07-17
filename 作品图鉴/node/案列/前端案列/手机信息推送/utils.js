// 渲染信息函数
// 修正函数名：rander → render
export function renderMessage(vnodeobj) {
  // 1. 创建当前节点的DOM元素
  const tag = document.createElement(vnodeobj.tag);

  // 2. 处理类名（className）
  if (vnodeobj.className) {
    // 若类名有多个（空格分隔），直接赋值更方便（classList.add会把空格当单个类名）
    tag.className = vnodeobj.className;
  }

  // 3. 处理文本内容（context）
  if (vnodeobj.context) {
    tag.textContent = vnodeobj.context;
  }

  // 4. 处理图片的src属性（针对img标签）
  if (vnodeobj.src) {
    tag.src = vnodeobj.src;
  }

  // 5. 递归处理子节点（核心：将子节点添加到当前节点）
  if (vnodeobj.children && vnodeobj.children.length > 0) {
    vnodeobj.children.forEach((child) => {
      // 递归渲染子节点，得到子节点的DOM元素
      const childDom = renderMessage(child);
      // 将子节点DOM添加到当前节点中
      tag.appendChild(childDom);
    });
  }

  // 6. 返回当前节点的DOM元素（供父节点挂载）
  return tag
}

