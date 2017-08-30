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

export {
  filter,
}
