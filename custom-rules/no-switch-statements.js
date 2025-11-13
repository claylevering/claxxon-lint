/**
 * @fileoverview ESLint rule to disallow switch statements in favor of if/else statements
 * @author Claxxon (Clay Levering)
 */

export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallow switch statements in favor of if/else statements',
            category: 'Best Practices',
            recommended: true
        },
        fixable: null,
        schema: [],
        messages: {
            noSwitchStatements: 'Switch statements are not allowed. Use if/else statements instead for better readability and to avoid fallthrough bugs.'
        }
    },

    create(context) {
        return {
            SwitchStatement(node) {
                context.report({
                    node,
                    messageId: 'noSwitchStatements'
                });
            }
        };
    }
};
