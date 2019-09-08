
export function arrayToTree(list: object[], props = {id: 'id', pid: 'pid', children: 'children'}) {
    let tree: object[] = [];
    let map: any = {};

    let listLength = list.length;
    for (let i = 0; i < listLength; i++) {
      let node: any = list[i];
      let nodeId: any = node[props.id];
      map[nodeId] = node;
    }

    for (let i = 0; i < listLength; i++) {
      let node: any = list[i];
      let nodePid: any = node[props.pid];
      let parentNode: any = map[nodePid];
      if (parentNode) {
        parentNode[props.children] = parentNode[props.children] || [];
        parentNode[props.children].push(node)
      } else {
        tree.push(node)
      }
    }

    return tree
  }