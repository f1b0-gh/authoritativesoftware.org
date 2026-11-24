// Presentation only: downloadable Markdown is left untouched.
const terms = ['artifact', 'operator', 'authority', 'consumer'];
const text = value => ({ type: 'text', value });
const el = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
export function documentPresentation({ declaration = false, declarationUrl = '/declaration/' } = {}) {
  return tree => {
    if (declaration) {
      let definitions = false;
      let principles = false;
      let provision;
      const children = [];
      for (const node of tree.children) {
        if (node.tagName === 'h2') {
          // Astro assigns heading IDs after custom plugins; use source heading text here.
          const heading = node.children.map(child => child.value ?? '').join('');
          definitions = heading === 'Definitions';
          principles = heading === 'Principles';
          provision = undefined;
        }
        if (definitions && node.tagName === 'p' && node.children?.[0]?.tagName === 'strong') {
          const name = node.children[0].children[0]?.value;
          if (terms.includes(name?.toLowerCase())) {
            const description = node.children.slice(1).map((child, i) => i === 0 && child.type === 'text' ? { ...child, value: child.value.replace(/^ — /, '') } : child);
            children.push(el('dl', { className: ['as-definition'], id: `definition-${name.toLowerCase()}` }, [el('dt', {}, [text(name)]), el('dd', {}, description)]));
            continue;
          }
        }
        if (principles && node.tagName === 'h3') {
          const number = node.children[0]?.value?.match(/^(\d+)\./)?.[1];
          provision = el('section', { className: ['as-provision'], ariaLabel: `Declaration principle ${number}` }, [el('div', { className: ['as-provision__label'] }, [text('Declaration text'), el('span', { className: ['as-provision__ref'] }, [text(`§${number}`)])])]);
          children.push(provision);
        }
        (provision ? provision.children : children).push(node);
      }
      tree.children = children;
      return;
    }
    const linked = new Set();
    function visit(node) {
      if (!node.children || /^(a|h[1-6]|pre|code|script|style)$/.test(node.tagName ?? '')) return;
      node.children = node.children.flatMap(child => {
        if (child.type !== 'text') { visit(child); return [child]; }
        const result = []; let cursor = 0;
        for (const match of child.value.matchAll(/\b(artifact|operator|authority|consumer)\b/gi)) {
          const term = match[0].toLowerCase();
          if (linked.has(term)) continue;
          result.push(text(child.value.slice(cursor, match.index)), el('a', { href: `${declarationUrl}#definition-${term}`, className: ['as-term'] }, [text(match[0])]));
          cursor = match.index + match[0].length; linked.add(term);
        }
        result.push(text(child.value.slice(cursor))); return result;
      });
    }
    visit(tree);
  };
}
