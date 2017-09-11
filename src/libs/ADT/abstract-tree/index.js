/**
 * @function filter
 * @brief Tree a -> filter -> filtered Tree b
 * @return: new filtered tree
 * @param node: abstract tree node, will use by rest of params
 * @param predict: function, (node: TreeNode)=>bool, true for keep node, false for abandon
 * @param get_children: (node: TreeNode)=>iterable<TreeNode>, get children of node
 * @param add_children: (node: TreeNode, iterable<TreeNode>)=>undefined, add children to a node
 * @param slice_node: (node: TreeNode)=>TreeNode, slice a node from tree, returns a node WITHOUT parent and any children
 */
const filter = (node, predict, get_children, add_children, slice_node) =>
{
  const children = get_children(node);
  var new_node = undefined;
  if (predict(node))
  {
    new_node = slice_node(node);
  }
  if (undefined === new_node)
  {
    return new_node;
  }
  const filtered_children = children.reduce((x, y)=>
  {
    const node = filter(y);
    if (undefined !== node)
    {
      x.push(node);
    }
  }, []);
  add_children(node, filtered_children);
  return new_node;
};

/**
 * @function arr2tree
 * @brief array -> arr2tree -> tree
 */
const a2t_bottom_up = (arr, tree_builder) => 
{
  var parent_nodes = [];
  for (var elem of arr)
  {
    node = tree_builder.construct_node(elem);
    var parent = tree_builder.select_parent(node);
    if (undefined != parent)
    {
      parent_nodes.push(parent);
    }
  }
  if (parent_nodes.length == 0)
  {
    return arr;
  }
  a2t_bottom_up(parent_nodes, tree_builder);
};

const tree_builder = {
  construct_node: function(src)
  {
  },
  construct_leaf: function(node)
  {
  },
  construct_branch: function(node)
  {
  },
};

const expect_tree = {
  'a': {
    'c': {},
    'd': {
      'e': 'foo',
    },
  },
  'b': {},
};
/**
 * @function build_prefix_tree
 * 广义前缀树生成器，从广义的前缀数组生成广义的前缀树
 * @param arr: 广义前缀数组，对前缀的操作由funcs参数提供
 * @param tree: 广义树，树的具体操作由funcs参数提供
 * @param funcs: 操作函数集，包括对数组，前缀和树的操作，详见函数说明
 * @returns: 生成的广义树
 * @description
 * 这个函数不直接使用前缀和树的任何数据成员，一切对前缀和树的操作都经由func参数传递。funcs参数需要提供如下函数:
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
 *  */

export {
  filter,
  build_prefix_tree,
}
