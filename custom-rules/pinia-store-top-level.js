/**
 * @fileoverview ESLint rule to enforce Pinia stores are only defined at top level
 * @author Claxxon (Clay Levering)
 */

export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce Pinia stores are only defined at the top level, not in functions or loops',
            category: 'Best Practices',
            recommended: true
        },
        fixable: null,
        schema: [],
        messages: {
            storeNotTopLevel:
                'Pinia store "{{storeName}}" must be defined at the top level, not inside {{scopeType}}. Move the store definition to the top of your setup function or script setup.'
        }
    },

    create(context) {
        // Track scope depth and types
        const scopeStack = [];
        let isInScriptSetup = false;
        let isInSetupFunction = false;
        let isInDefineStoreSetup = false;
        let isInPluginInstall = false;

        // Check if a function name looks like a Pinia store (starts with 'use' and ends with 'Store')
        function isPiniaStore(name) {
            return name && typeof name === 'string' && name.startsWith('use') && name.endsWith('Store');
        }

        // Get human-readable scope description
        function getScopeDescription(scope) {
            switch (scope.type) {
                case 'FunctionExpression':
                case 'ArrowFunctionExpression':
                case 'FunctionDeclaration':
                    return 'a function';
                case 'ForStatement':
                case 'ForInStatement':
                case 'ForOfStatement':
                    return 'a for loop';
                case 'WhileStatement':
                case 'DoWhileStatement':
                    return 'a while loop';
                case 'IfStatement':
                    return 'an if statement';
                case 'BlockStatement':
                    return 'a block';
                case 'TryStatement':
                    return 'a try statement';
                case 'CatchClause':
                    return 'a catch block';
                case 'SwitchStatement':
                    return 'a switch statement';
                default:
                    return 'a nested scope';
            }
        }

        function isDefineStoreSetup(node) {
            const parent = node.parent;
            return (
                parent &&
                parent.type === 'CallExpression' &&
                parent.callee &&
                parent.callee.type === 'Identifier' &&
                parent.callee.name === 'defineStore' &&
                parent.arguments &&
                parent.arguments.length >= 2 &&
                parent.arguments[1] === node
            );
        }

        // Update isAllowedScope to modify the top-level condition and add allowance for functions in non-Vue files
        function isAllowedScope() {
            // No nested scopes = top level
            if (scopeStack.length === 0) {
                // Only allow at program level in Vue files
                return isInScriptSetup;
            }

            // For Vue script setup, we allow stores directly in the Program scope
            if (isInScriptSetup && scopeStack.length === 0) {
                return true;
            }

            // For setup function, we allow stores directly in the setup function body
            if (
                isInSetupFunction &&
                scopeStack.length === 1 &&
                (scopeStack[0].type === 'FunctionExpression' || scopeStack[0].type === 'ArrowFunctionExpression' || scopeStack[0].type === 'FunctionDeclaration')
            ) {
                return true;
            }

            // For defineStore setup function, allow stores directly in the function body
            if (
                isInDefineStoreSetup &&
                scopeStack.length === 1 &&
                (scopeStack[0].type === 'FunctionExpression' || scopeStack[0].type === 'ArrowFunctionExpression' || scopeStack[0].type === 'FunctionDeclaration')
            ) {
                return true;
            }

            // For Vue plugin install function, allow stores directly in the function body
            if (
                isInPluginInstall &&
                scopeStack.length === 1 &&
                (scopeStack[0].type === 'FunctionExpression' || scopeStack[0].type === 'ArrowFunctionExpression' || scopeStack[0].type === 'FunctionDeclaration')
            ) {
                return true;
            }

            // For non-Vue files (like composables), allow stores directly inside top-level functions
            if (
                !isInScriptSetup &&
                scopeStack.length === 1 &&
                (scopeStack[0].type === 'FunctionExpression' || scopeStack[0].type === 'ArrowFunctionExpression' || scopeStack[0].type === 'FunctionDeclaration')
            ) {
                return true;
            }

            return false;
        }

        return {
            // Track when we enter different scopes
            Program(_node) {
                // Check if this is a Vue script setup by looking at the file extension
                const filename = context.getFilename();
                isInScriptSetup = filename.endsWith('.vue');
            },

            // Track function scopes - ENTER
            FunctionExpression(node) {
                const parent = node.parent;
                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'setup') {
                    isInSetupFunction = true;
                }

                if (isDefineStoreSetup(node)) {
                    isInDefineStoreSetup = true;
                }

                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'install') {
                    isInPluginInstall = true;
                }

                scopeStack.push(node);
            },

            ArrowFunctionExpression(node) {
                const parent = node.parent;
                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'setup') {
                    isInSetupFunction = true;
                }

                if (isDefineStoreSetup(node)) {
                    isInDefineStoreSetup = true;
                }

                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'install') {
                    isInPluginInstall = true;
                }

                scopeStack.push(node);
            },

            FunctionDeclaration(node) {
                if (isDefineStoreSetup(node)) {
                    isInDefineStoreSetup = true;
                }

                const parent = node.parent;
                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'install') {
                    isInPluginInstall = true;
                }

                scopeStack.push(node);
            },

            // Track function scopes - EXIT
            'FunctionExpression:exit'(node) {
                scopeStack.pop();

                if (isDefineStoreSetup(node)) {
                    isInDefineStoreSetup = false;
                }

                const parent = node.parent;
                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'install') {
                    isInPluginInstall = false;
                }

                if (isInSetupFunction && scopeStack.length === 0) {
                    isInSetupFunction = false;
                }
            },

            'ArrowFunctionExpression:exit'(node) {
                scopeStack.pop();

                if (isDefineStoreSetup(node)) {
                    isInDefineStoreSetup = false;
                }

                const parent = node.parent;
                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'install') {
                    isInPluginInstall = false;
                }

                if (isInSetupFunction && scopeStack.length === 0) {
                    isInSetupFunction = false;
                }
            },

            'FunctionDeclaration:exit'(node) {
                scopeStack.pop();

                if (isDefineStoreSetup(node)) {
                    isInDefineStoreSetup = false;
                }

                const parent = node.parent;
                if (parent && parent.type === 'Property' && parent.key && parent.key.name === 'install') {
                    isInPluginInstall = false;
                }
            },

            // Track loop scopes - ENTER
            ForStatement(node) {
                scopeStack.push(node);
            },

            ForInStatement(node) {
                scopeStack.push(node);
            },

            ForOfStatement(node) {
                scopeStack.push(node);
            },

            WhileStatement(node) {
                scopeStack.push(node);
            },

            DoWhileStatement(node) {
                scopeStack.push(node);
            },

            // Track loop scopes - EXIT
            'ForStatement:exit'(_node) {
                scopeStack.pop();
            },

            'ForInStatement:exit'(_node) {
                scopeStack.pop();
            },

            'ForOfStatement:exit'(_node) {
                scopeStack.pop();
            },

            'WhileStatement:exit'(_node) {
                scopeStack.pop();
            },

            'DoWhileStatement:exit'(_node) {
                scopeStack.pop();
            },

            // Track other scopes - ENTER
            IfStatement(node) {
                scopeStack.push(node);
            },

            TryStatement(node) {
                scopeStack.push(node);
            },

            CatchClause(node) {
                scopeStack.push(node);
            },

            SwitchStatement(node) {
                scopeStack.push(node);
            },

            // Track other scopes - EXIT
            'IfStatement:exit'(_node) {
                scopeStack.pop();
            },

            'TryStatement:exit'(_node) {
                scopeStack.pop();
            },

            'CatchClause:exit'(_node) {
                scopeStack.pop();
            },

            'SwitchStatement:exit'(_node) {
                scopeStack.pop();
            },

            // Track block statements
            BlockStatement(node) {
                // Only track block statements that aren't function bodies or top-level blocks
                const parent = node.parent;
                if (
                    parent &&
                    parent.type !== 'FunctionExpression' &&
                    parent.type !== 'ArrowFunctionExpression' &&
                    parent.type !== 'FunctionDeclaration' &&
                    parent.type !== 'Program'
                ) {
                    scopeStack.push(node);
                }
            },

            'BlockStatement:exit'(node) {
                const parent = node.parent;
                if (
                    parent &&
                    parent.type !== 'FunctionExpression' &&
                    parent.type !== 'ArrowFunctionExpression' &&
                    parent.type !== 'FunctionDeclaration' &&
                    parent.type !== 'Program'
                ) {
                    scopeStack.pop();
                }
            },

            // Check store calls
            CallExpression(node) {
                if (node.callee && node.callee.type === 'Identifier' && isPiniaStore(node.callee.name)) {
                    if (!isAllowedScope()) {
                        const currentScope = scopeStack[scopeStack.length - 1];
                        const scopeDescription = currentScope ? getScopeDescription(currentScope) : 'a nested scope';

                        context.report({
                            node,
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: node.callee.name,
                                scopeType: scopeDescription
                            }
                        });
                    }
                }
            }
        };
    }
};
