/**
 * Custom ESLint rules for @claylevering
 */

import piniaStoreTopLevel from './pinia-store-top-level.js';
import noSwitchStatements from './no-switch-statements.js';
import noVueGlobalImports from './no-vue-global-imports.js';
import piniaStorePattern from './pinia-store-pattern.js';

export default {
    rules: {
        'pinia-store-top-level': piniaStoreTopLevel,
        'no-switch-statements': noSwitchStatements,
        'no-vue-global-imports': noVueGlobalImports,
        'pinia-store-pattern': piniaStorePattern
    }
};
