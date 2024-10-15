const postcss = require('postcss');

function customPrintFunction(path, options, print) {
  const root = path.getValue();
  if (!root || !root.nodes) {
    console.error("Invalid root structure:", root);
    return "";
  }

  const groups = {
    behavior: ["cursor", "display", "position", "float", "clear", "visibility", "overflow", "white-space", "z-index", "overflow-x", "overflow-y"],
    shape: ["width", "height", "padding", "margin", "border", "border-radius", "border-width", "border-style", "border-color", "box-sizing"],
    font: ["font-family", "font-size", "font-weight", "font-style", "line-height", "text-align", "text-transform", "text-decoration", "color", "letter-spacing"],
    layout: ["flex", "flex-basis", "flex-direction", "flex-grow", "flex-shrink", "flex-wrap", "justify-content", "align-items", "align-content", "align-self", "grid", "grid-template-columns", "grid-template-rows", "grid-auto-flow", "grid-gap", "grid-row-gap", "grid-column-gap", "grid-area", "grid-row", "grid-column"],
    miscellaneous: ["opacity", "filter", "clip", "clip-path", "mask"]
  };

  let result = '';
  root.nodes.forEach(rule => {
    if (rule.type === 'rule' && rule.nodes) {
      result += `${rule.selector} {\n`;

      const grouped = { behavior: [], font: [], shape: [], style: [], other: [] };
      rule.nodes.forEach(decl => {
        if (decl.type === 'decl') {
          let found = false;
          for (const group in groups) {
            if (groups[group].includes(decl.prop)) {
              if (!grouped[group]) {
                grouped[group] = [];
              }
              grouped[group].push(decl);
              found = true;
              break;
            }
          }
          if (!found) {
            if (!grouped.other) {
              grouped.other = [];
            }
            grouped.other.push(decl);
          }
        }
      });

      const groupKeys = Object.keys(grouped);
      groupKeys.forEach((group, index) => {
        if (grouped[group].length > 0) {
          grouped[group].forEach(decl => {
            result += `  ${decl.prop}: ${decl.value};\n`;
          });
          if (index !== groupKeys.length - 1 && grouped[groupKeys[index + 1]].length > 0) {
            result += '\n';
          }
        }
      });
      result += '}\n\n';
    }
  });

  return result.trim();
}

module.exports = {
  languages: [
    {
      name: "CSS",
      parsers: ["css"],
      extensions: [".css"],
      vscodeLanguageIds: ["css"],
    },
  ],
  parsers: {
    css: {
      parse: text => {
        const ast = postcss.parse(text);
        return ast;
      },
      astFormat: "css-ast",
    },
  },
  printers: {
    "css-ast": {
      print: (path, options, print) => {
        return customPrintFunction(path, options, print);
      }
    }
  },
  defaultOptions: {
    tabWidth: 2,
  },
};