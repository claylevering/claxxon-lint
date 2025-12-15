/**
 * Tests for the no-switch-statements rule
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../custom-rules/no-switch-statements.js';

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    }
});

describe('no-switch-statements', () => {
    it('should pass RuleTester validation', () => {
        ruleTester.run('no-switch-statements', rule, {
            valid: [
                // If/else statements are allowed
                `
                    if (value === 1) {
                        return 'one';
                    } else if (value === 2) {
                        return 'two';
                    } else {
                        return 'other';
                    }
                `,

                // Ternary operators are allowed
                `const result = value === 1 ? 'one' : 'other';`,

                // Object lookup pattern is allowed
                `
                    const handlers = {
                        1: () => 'one',
                        2: () => 'two'
                    };
                    const result = handlers[value]?.() || 'other';
                `,

                // Map-based lookup is allowed
                `
                    const map = new Map([
                        [1, 'one'],
                        [2, 'two']
                    ]);
                    const result = map.get(value) || 'other';
                `
            ],

            invalid: [
                // Basic switch statement
                {
                    code: `
                        switch (value) {
                            case 1:
                                return 'one';
                            default:
                                return 'other';
                        }
                    `,
                    errors: [{ messageId: 'noSwitchStatements' }]
                },

                // Switch with multiple cases
                {
                    code: `
                        switch (type) {
                            case 'a':
                            case 'b':
                                doSomething();
                                break;
                            case 'c':
                                doSomethingElse();
                                break;
                            default:
                                doDefault();
                        }
                    `,
                    errors: [{ messageId: 'noSwitchStatements' }]
                },

                // Nested switch (reports outer only since inner is inside outer)
                {
                    code: `
                        switch (outer) {
                            case 1:
                                switch (inner) {
                                    case 'a':
                                        return 'nested';
                                    default:
                                        return 'default';
                                }
                            default:
                                return 'outer default';
                        }
                    `,
                    errors: [{ messageId: 'noSwitchStatements' }, { messageId: 'noSwitchStatements' }]
                },

                // Switch inside function
                {
                    code: `
                        function handleValue(val) {
                            switch (val) {
                                case 1:
                                    return 'one';
                                default:
                                    return 'default';
                            }
                        }
                    `,
                    errors: [{ messageId: 'noSwitchStatements' }]
                },

                // Switch inside arrow function
                {
                    code: `
                        const handler = (val) => {
                            switch (val) {
                                case 'a':
                                    return 1;
                                default:
                                    return 0;
                            }
                        };
                    `,
                    errors: [{ messageId: 'noSwitchStatements' }]
                },

                // Empty switch
                {
                    code: `
                        switch (value) {
                        }
                    `,
                    errors: [{ messageId: 'noSwitchStatements' }]
                }
            ]
        });
    });
});
