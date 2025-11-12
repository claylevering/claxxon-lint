/**
 * Custom ESLint rule: vue-component-name-the
 * 
 * Requires all Vue component names to contain the word "The"
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'require component names to contain "The"',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null,
    schema: []
  },

  create(context) {
    return {
      // Check component name in the name property
      'ExportDefaultDeclaration > ObjectExpression > Property[key.name="name"]'(node) {
        if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
          const componentName = node.value.value;
          if (!componentName.includes('The')) {
            context.report({
              node: node.value,
              message: 'Component name "{{ name }}" must contain the word "The"',
              data: {
                name: componentName
              }
            });
          }
        }
      },

      // Check component name in script setup with defineComponent
      'CallExpression[callee.name="defineComponent"] > ObjectExpression > Property[key.name="name"]'(node) {
        if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
          const componentName = node.value.value;
          if (!componentName.includes('The')) {
            context.report({
              node: node.value,
              message: 'Component name "{{ name }}" must contain the word "The"',
              data: {
                name: componentName
              }
            });
          }
        }
      }
    };
  }
};
