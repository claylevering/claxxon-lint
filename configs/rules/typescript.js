export default {
    // Customized TypeScript rules from Claxxon
    '@typescript-eslint/no-explicit-any': 'off',

    // Disable base rule in favor of TypeScript-aware version
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true
        }
    ],

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    // Disable base rule in favor of TypeScript-aware version
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error'
};
