// Tables and code blocks can overflow narrow viewports. Make their scroll areas
// reachable without a pointer, including in browsers that do not do this by default.
export function keyboardScroll() {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element' && (node.tagName === 'table' || node.tagName === 'pre')) {
        node.properties = { ...node.properties, tabIndex: 0 };
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
