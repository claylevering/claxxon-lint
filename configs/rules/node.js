export default {
    // Customized Node / JS rules from Claxxon
    'comma-dangle': 'off',
    curly: ['error', 'all'],
    indent: ['error', 4, { SwitchCase: 1 }],
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
    'prefer-const': 'error',
    'sort-imports': 'off',
    'sort-keys': 'off'
};
