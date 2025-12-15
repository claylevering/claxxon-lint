/**
 * @fileoverview ESLint rule to prevent importing Vue/Vite globals that are available automatically
 * @author Claxxon (Clay Levering)
 */

export default {
    meta: {
        type: 'error',
        docs: {
            description: 'Prevent importing Vue/Vite globals that are available automatically in script setup',
            category: 'Best Practices',
            recommended: true
        },
        fixable: null,
        schema: [],
        messages: {
            noVueGlobalImports: 'Do not import "{{ importName }}" from "{{ source }}". This is available globally in Vue 3 script setup and Vite. Remove this import statement.'
        }
    },

    create(context) {
        // List of Vue compiler macros that should NOT be imported (auto-available in <script setup>)
        // Note: defineAsyncComponent and defineComponent are runtime functions, NOT compiler macros
        const vueCompilerMacros = new Set(['defineProps', 'defineEmits', 'defineExpose', 'defineOptions', 'defineSlots', 'defineModel', 'withDefaults']);

        // Sources that commonly provide these globals
        const vueSources = new Set(['vue', '@vue/composition-api', '@vue/runtime-core', '@vue/reactivity']);

        return {
            ImportDeclaration(node) {
                const source = node.source.value;

                // Only check imports from Vue-related sources
                if (!vueSources.has(source)) {
                    return;
                }

                // Check each imported specifier
                node.specifiers.forEach((specifier) => {
                    let importName;

                    // Handle different import types
                    if (specifier.type === 'ImportSpecifier') {
                        // Named imports: import { defineProps } from 'vue'
                        importName = specifier.imported.name;
                    } else if (specifier.type === 'ImportDefaultSpecifier') {
                        // Default imports: import Vue from 'vue' (less common in Vue 3)
                        importName = specifier.local.name;
                    } else if (specifier.type === 'ImportNamespaceSpecifier') {
                        // Namespace imports: import * as Vue from 'vue'
                        // We don't flag these as they're accessing via namespace
                        return;
                    }

                    if (vueCompilerMacros.has(importName)) {
                        context.report({
                            node: specifier,
                            messageId: 'noVueGlobalImports',
                            data: {
                                importName,
                                source
                            }
                        });
                    }
                });
            }
        };
    }
};
