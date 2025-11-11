/**
 * @fileoverview ESLint rule to enforce defining Pinia stores as variables before accessing properties
 * @author Claxxon (Clay Levering)
 */

export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce defining Pinia stores as variables before accessing properties',
            category: 'Best Practices',
            recommended: true
        },
        fixable: null,
        schema: [],
        messages: {
            noDirectStoreChaining:
                'Define the Pinia store as a variable first, then access its properties. Use: const {{storeName}} = {{storeCall}}(); const property = {{storeName}}.{{property}};'
        }
    },

    create(context) {
        // Track store function calls that have been assigned to variables
        const assignedStores = new Set();

        const isInVueFile = context.getFilename().endsWith('.vue');

        // Check if a function name looks like a Pinia store (starts with 'use' and ends with 'Store')
        function isPiniaStore(name) {
            return name && typeof name === 'string' && name.startsWith('use') && name.endsWith('Store');
        }

        return {
            // Track variable declarations that assign store calls
            VariableDeclarator(node) {
                if (node.init && node.init.type === 'CallExpression' && node.init.callee && node.init.callee.type === 'Identifier' && isPiniaStore(node.init.callee.name)) {
                    assignedStores.add(node.init.callee.name);
                }
            },

            // Check for direct chaining on store calls
            MemberExpression(node) {
                // Skip enforcement in non-Vue files (e.g., composables)
                if (!isInVueFile) {
                    return;
                }

                // Check if we have a member access on a direct store call
                if (
                    node.object &&
                    node.object.type === 'CallExpression' &&
                    node.object.callee &&
                    node.object.callee.type === 'Identifier' &&
                    isPiniaStore(node.object.callee.name)
                ) {
                    const storeName = node.object.callee.name;
                    const storeCall = storeName.replace('Store', '');
                    const storeVarName = storeCall.replace('use', '').toLowerCase() + 'Store';
                    const propertyName = node.property.name || 'property';

                    context.report({
                        node,
                        messageId: 'noDirectStoreChaining',
                        data: {
                            storeName: storeVarName,
                            storeCall: storeName,
                            property: propertyName
                        }
                    });
                }

                // Also check for chained member expressions (deeper nesting)
                if (
                    node.object &&
                    node.object.type === 'MemberExpression' &&
                    node.object.object &&
                    node.object.object.type === 'CallExpression' &&
                    node.object.object.callee &&
                    node.object.object.callee.type === 'Identifier' &&
                    isPiniaStore(node.object.object.callee.name)
                ) {
                    const storeName = node.object.object.callee.name;
                    const storeCall = storeName.replace('Store', '');
                    const storeVarName = storeCall.replace('use', '').toLowerCase() + 'Store';

                    context.report({
                        node,
                        messageId: 'noDirectStoreChaining',
                        data: {
                            storeName: storeVarName,
                            storeCall: storeName,
                            property: 'property'
                        }
                    });
                }
            }
        };
    }
};
