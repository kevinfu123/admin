export function ergodicTree(tree: object[], callback: any = () => {}, props = {id: 'id', pid: 'pid', children: 'children'}) {
    function _ergodicTree(tree: object[], parentIdPath?: any[], depth: number = 0) {
      const treeLength = tree.length;
      for (let i = 0; i < treeLength; i++) {
        let node: any = tree[i];
        const _idPath: any[] = parentIdPath ? [...parentIdPath, node[props.id]] : [node[props.id]];
        const _depth: number = depth + 1;
        node._idPath = _idPath;
        node._depth = _depth;
        callback(node);
        if (node[props.children] && node[props.children] instanceof Array) {
          _ergodicTree(node[props.children], _idPath, _depth)
        }
      }
    }

    _ergodicTree(tree);
    return tree;
  }