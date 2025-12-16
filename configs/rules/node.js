export default {
    // Customized Node / JS rules from Claxxon
    'capitalized-comments': 'off',
    'comma-dangle': 'off',
    complexity: 'off',
    curly: ['error', 'all'],
    'func-style': 'off',
    'id-length': 'off',
    indent: ['error', 4, { SwitchCase: 1 }],
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-inline-comments': 'off',
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'no-param-reassign': [
        'error',
        { ignorePropertyModificationsFor: ['context', 'acc', 'curr', '_state', '_store', '_app'], ignorePropertyModificationsForRegex: ['^__'], props: true }
    ],
    'no-plusplus': 'error',
    'no-shadow': 'error',
    'no-tabs': 'error',
    'no-unassigned-vars': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id', '_error'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    'no-use-before-define': 'error',
    'no-useless-escape': 'error',
    'one-var': 'off',

    // Require blank lines around block statements for readability
    // This improves code spacing and makes control flow easier to scan
    'padding-line-between-statements': [
        'warn',
        // Require blank line after multiline block statements (if, for, while, switch, try, etc.)
        { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
        // Require blank line before block statements when preceded by other statements
        { blankLine: 'always', prev: '*', next: 'block-like' }
    ],

    'prefer-const': 'error',
    'sort-imports': 'off',
    'sort-keys': 'off'
};
