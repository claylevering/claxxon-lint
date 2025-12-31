export default {
    // Disable some rules where Vue has the better version
    'no-useless-assignment': 'off',

    // Customized Vue rules from Claxxon - assuming the Vue plugin is already loaded
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/custom-event-name-casing': 'off',
    'vue/html-indent': ['error', 4],
    'vue/no-undef-components': 'error',
    'vue/no-undef-properties': 'error',
    'vue/no-unused-properties': 'error',
    'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
    'vue/script-indent': ['error', 0, { baseIndent: 0 }],

    // Custom Pinia store rules
    'claxxon-vue/pinia-store-pattern': 'error',
    'claxxon-vue/pinia-store-top-level': 'error',

    // Prevent importing Vue globals
    'claxxon-vue/no-vue-global-imports': 'error',

    // Disallow switch statements
    'claxxon-vue/no-switch-statements': 'error'
};
