/**
 * Tests for the no-vue-global-imports rule
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../custom-rules/no-vue-global-imports.js';

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    }
});

describe('no-vue-global-imports', () => {
    it('should pass RuleTester validation', () => {
        ruleTester.run('no-vue-global-imports', rule, {
            valid: [
                // Regular Vue imports are fine
                `import { ref, computed, watch } from 'vue';`,

                // DefineComponent is a runtime function, not a compiler macro
                `import { defineComponent } from 'vue';`,

                // DefineAsyncComponent is a runtime function, not a compiler macro
                `import { defineAsyncComponent } from 'vue';`,

                // Both together
                `import { defineComponent, defineAsyncComponent, ref } from 'vue';`,

                // Namespace imports are allowed (accessing via Vue.defineProps is fine)
                `import * as Vue from 'vue';`,

                // Imports from non-Vue sources are ignored
                `import { defineProps } from 'some-other-package';`,
                `import { defineEmits } from './local-file';`,

                // Default import of Vue itself is fine (though unusual in Vue 3)
                `import Vue from 'vue';`,

                // Imports from unrelated packages
                `import { useState } from 'react';`,
                `import { defineStore } from 'pinia';`,

                // Mixed valid imports
                `import { ref, computed, onMounted, defineComponent } from 'vue';`
            ],

            invalid: [
                // DefineProps from vue
                {
                    code: `import { defineProps } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineProps', source: 'vue' }
                        }
                    ]
                },

                // DefineEmits from vue
                {
                    code: `import { defineEmits } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineEmits', source: 'vue' }
                        }
                    ]
                },

                // DefineExpose from vue
                {
                    code: `import { defineExpose } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineExpose', source: 'vue' }
                        }
                    ]
                },

                // DefineOptions from vue
                {
                    code: `import { defineOptions } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineOptions', source: 'vue' }
                        }
                    ]
                },

                // DefineSlots from vue
                {
                    code: `import { defineSlots } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineSlots', source: 'vue' }
                        }
                    ]
                },

                // DefineModel from vue (Vue 3.4+)
                {
                    code: `import { defineModel } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineModel', source: 'vue' }
                        }
                    ]
                },

                // WithDefaults from vue
                {
                    code: `import { withDefaults } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'withDefaults', source: 'vue' }
                        }
                    ]
                },

                // Multiple compiler macros in one import
                {
                    code: `import { defineProps, defineEmits, withDefaults } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineProps', source: 'vue' }
                        },
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineEmits', source: 'vue' }
                        },
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'withDefaults', source: 'vue' }
                        }
                    ]
                },

                // Mixed valid and invalid imports
                {
                    code: `import { ref, defineProps, computed, defineEmits } from 'vue';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineProps', source: 'vue' }
                        },
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineEmits', source: 'vue' }
                        }
                    ]
                },

                // From @vue/composition-api
                {
                    code: `import { defineProps } from '@vue/composition-api';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineProps', source: '@vue/composition-api' }
                        }
                    ]
                },

                // From @vue/runtime-core
                {
                    code: `import { defineEmits } from '@vue/runtime-core';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineEmits', source: '@vue/runtime-core' }
                        }
                    ]
                },

                // From @vue/reactivity
                {
                    code: `import { defineExpose } from '@vue/reactivity';`,
                    errors: [
                        {
                            messageId: 'noVueGlobalImports',
                            data: { importName: 'defineExpose', source: '@vue/reactivity' }
                        }
                    ]
                },

                // All compiler macros together
                {
                    code: `import { defineProps, defineEmits, defineExpose, defineOptions, defineSlots, defineModel, withDefaults } from 'vue';`,
                    errors: [
                        { messageId: 'noVueGlobalImports', data: { importName: 'defineProps', source: 'vue' } },
                        { messageId: 'noVueGlobalImports', data: { importName: 'defineEmits', source: 'vue' } },
                        { messageId: 'noVueGlobalImports', data: { importName: 'defineExpose', source: 'vue' } },
                        { messageId: 'noVueGlobalImports', data: { importName: 'defineOptions', source: 'vue' } },
                        { messageId: 'noVueGlobalImports', data: { importName: 'defineSlots', source: 'vue' } },
                        { messageId: 'noVueGlobalImports', data: { importName: 'defineModel', source: 'vue' } },
                        { messageId: 'noVueGlobalImports', data: { importName: 'withDefaults', source: 'vue' } }
                    ]
                }
            ]
        });
    });
});
