export default {
    // Customized Node / JS rules from Claxxon
    indent: ['error', 4, { SwitchCase: 1 }],
    'comma-dangle': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 'error',
    'no-param-reassign': [
        'error',
        { ignorePropertyModificationsFor: ['context', 'acc', 'curr', '_state', '_store', '_app'], ignorePropertyModificationsForRegex: ['^__'], props: true }
    ],
    'no-useless-escape': ['error', { allowRegexCharacters: ['-'] }],
    'no-shadow': 'error',
    'no-tabs': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id', '_error'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    'no-use-before-define': 'error',
    'prefer-const': 'error'
};
