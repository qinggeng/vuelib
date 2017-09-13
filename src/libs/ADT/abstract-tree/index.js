/**
 * @function filter_tree
 * 广义树过滤器，遍历树节点，检测每个树节点是否符合过滤条件，如果符合，则在结果树中保留这个节点的子树和先祖节点
 * @param tree 广义树或者树集合
 * @param funcs 广义树的操作函数
 * funcs.get_nodes: tree-> array[node] - 将广义树或者广义树集合转化为根节点序列
 * funcs.predict: node-> boolean - 过滤条件
 * funcs.slice_subtree: node->node - 复制树节点，同时复制子树
 * funcs.add_children: (node, children)-> undefiend - 向节点添加子节点，用于为结果树的节点添加过滤的子节点
 * funcs.build_filtered_tree: (array[node], tree) -> tree - 从过滤好的节点集合构造树或者树集合
 */
const filter_tree = (tree, funcs) =>
{
  var filtered_nodes = funcs.get_nodes(tree).map(node=>
  {
    if (funcs.predict(node))
    {
      return funcs.slice_subtree(node);
    }
    var children = funcs.get_children(node);
    if (children != undefined)
    {
      var filtered_children = filter_tree(children, funcs);
      if (filtered_children.length > 0)
      {
        var filtered_node = funcs.slice_node(node);
        funcs.add_children(filtered_node, filtered_children);
        return filtered_node;
      }
    }
    return undefined;
  }).filter(x=>x !== undefined);
  return funcs.build_filtered_tree(filtered_nodes, tree);
}
/**
 * @function build_prefix_tree
 * 广义前缀树生成器，从广义的前缀数组生成广义的前缀树
 * @param arr: 广义前缀数组，对前缀的操作由funcs参数提供
 * @param tree: 广义树，树的具体操作由funcs参数提供
 * @param funcs: 操作函数集，包括对数组，前缀和树的操作，详见函数说明
 * @returns: 生成的广义树
 * @description
 * 这个函数不直接使用前缀和树的任何数据成员，一切对前缀和树的操作都经由funcs参数传递。funcs参数需要提供如下函数:
 * # 前缀操作
 * ## get_element: (prefix_string)=> prefix_node - 获取前缀串的首个节点
 * ## get_rest: (prefix_string)=> prefix_string - 获取前缀串除首节点以外的剩余部分, 当剩余部分不存在时，应返回undefined
 * # 树操作
 * ## select_node: (prefix_node, tree)=>tree_node - 从广义树中为前缀节点选择合适的已存在的树节点, 当树节点不存在时，返回undefined
 * ## append_node: (prefix_node, tree)=>tree_node - 在广义树中为前缀节点添加相应的树节点并返回
 * ## get_children: (tree_node)=>tree - 获取一个树节点的子树
 */

const build_prefix_tree = (arr, tree, funcs) => 
{
  const build_branch = (prefix, tree, funcs) => 
  {
    if (prefix === undefined)
    {
      return;
    }
    var root = funcs.get_element(prefix);
    var tree_node = funcs.select_node(root, tree);
    if (undefined === tree_node)
    {
      tree_node = append_node(root, tree);
    }
    build_branch(funcs.get_rest(prefix), funcs.get_children(tree_node), funcs);
  }

  for (var prefix of arr)
  {
    build_branch(prefix, tree, funcs);
  }
  return tree;
}
/**
 * 构造广义前缀树的例子
 *
 * const folders = `
 * src
 * src/assets
 * src/components
 * src/components/bz
 * src/components/bz/demo
 * src/components/ui
 * src/libs
 * src/libs/ADT
 * src/libs/ADT/abstract-tree
 * src/router
 * src/store
 * `.trim().split('\n').map(x=>x.split('/'))
 * 
 * var select_node = (elem, tree)=>
 * {
 *   return tree.filter(x=>x.name === elem)[0];
 * }
 * 
 * var append_node = (elem, tree)=>
 * {
 *   var node = {name: elem, children: []};
 *   tree.push(node);
 *   return node;
 * }
 * 
 * var get_children = (node)=>
 * {
 *   return node.children;
 * }
 * 
 * var get_element = (path)=>
 * {
 *   return path[0];
 * }
 * 
 * var get_rest = (path)=>
 * {
 *   var ret = path.slice(1);
 *   if (ret.length === 0)
 *   {
 *     return undefined;
 *   }
 *   return ret;
 * }
 * 
 * console.log(JSON.stringify(build_prefix_tree(folders, [], {
 *   select_node,
 *   append_node,
 *   get_children,
 *   get_element,
 *   get_rest,
 * })));
 */

/**
 * 树过滤器的例子
 * const folders = `
 * src
 * src/assets
 * src/components
 * src/components/bz
 * src/components/bz/demo
 * src/components/ui
 * src/libs
 * src/libs/ADT
 * src/libs/ADT/abstract-tree
 * src/router
 * src/store
 * `.trim().split('\n').map(x=>x.split('/'))
 * 
 * var select_node = (elem, tree)=>
 * {
 *   return tree.filter(x=>x.name === elem)[0];
 * }
 * 
 * var append_node = (elem, tree)=>
 * {
 *   var node = {name: elem, children: []};
 *   tree.push(node);
 *   return node;
 * }
 * 
 * var get_children = (node)=>
 * {
 *   return node.children;
 * }
 * 
 * var get_element = (path)=>
 * {
 *   return path[0];
 * }
 * 
 * var get_rest = (path)=>
 * {
 *   var ret = path.slice(1);
 *   if (ret.length === 0)
 *   {
 *     return undefined;
 *   }
 *   return ret;
 * }
 * 
 * var tree = build_prefix_tree(folders, [], {
 *   select_node,
 *   append_node,
 *   get_children,
 *   get_element,
 *   get_rest,
 * });
 * 
 * const funcs = {
 *   get_nodes: (tree)=>
 *   {
 *     return tree;
 *   },
 *   predict: (node)=>
 *   {
 *     return node.name === 'components';
 *   },
 *   slice_subtree: (node)=>
 *   {
 *     return JSON.parse(JSON.stringify(node));
 *   },
 *   get_children: (node)=>
 *   {
 *     return node.children;
 *   },
 *   slice_node: (node)=>
 *   {
 *     var sliced = JSON.parse(JSON.stringify(node));
 *     sliced.children = [];
 *     return sliced;
 *   },
 *   add_children: (node, children)=>
 *   {
 *     for (var child of children)
 *     {
 *       node.children.push(child);
 *     }
 *   },
 *   build_filtered_tree: (filtered, origin)=>
 *   {
 *     return filtered;
 *   },
 * };
 * 
 * const filtered_tree = filter_tree(tree, funcs);
 * console.log(JSON.stringify(filtered_tree, null, '  '));
 */

export {
  filter_tree,
  build_prefix_tree,
}
