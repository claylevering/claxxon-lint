/**
 * Tests for the pinia-store-pattern rule
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../custom-rules/pinia-store-pattern.js';

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    }
});

describe('pinia-store-pattern', () => {
    it('should pass RuleTester validation for Vue files', () => {
        ruleTester.run('pinia-store-pattern', rule, {
            valid: [
                // Correct pattern: assign store to variable first
                {
                    code: `
                        const userStore = useUserStore();
                        const userId = userStore.id;
                    `,
                    filename: 'Component.vue'
                },

                // Multiple stores, each assigned to variable
                {
                    code: `
                        const userStore = useUserStore();
                        const cartStore = useCartStore();
                        const userId = userStore.id;
                        const items = cartStore.items;
                    `,
                    filename: 'Component.vue'
                },

                // Using storeToRefs pattern
                {
                    code: `
                        const userStore = useUserStore();
                        const { id, name } = storeToRefs(userStore);
                    `,
                    filename: 'Component.vue'
                },

                // Store method call (not property access) is technically still wrong but tests the pattern
                {
                    code: `
                        const userStore = useUserStore();
                        userStore.fetchUser();
                    `,
                    filename: 'Component.vue'
                },

                // Non-store hooks are not affected
                {
                    code: `
                        const data = useAsyncData().data;
                    `,
                    filename: 'Component.vue'
                },

                // Regular function calls are not affected
                {
                    code: `
                        const result = getData().value;
                    `,
                    filename: 'Component.vue'
                },

                // Composables (non-vue files) are allowed to chain
                {
                    code: `
                        const userId = useUserStore().id;
                    `,
                    filename: 'useAuth.js'
                },

                // TypeScript composables are also allowed
                {
                    code: `
                        const userId = useUserStore().id;
                    `,
                    filename: 'useAuth.ts'
                },

                // Store call without chaining is fine
                {
                    code: `
                        const userStore = useUserStore();
                    `,
                    filename: 'Component.vue'
                },

                // Destructuring from store variable is fine
                {
                    code: `
                        const userStore = useUserStore();
                        const { id, name } = userStore;
                    `,
                    filename: 'Component.vue'
                }
            ],

            invalid: [
                // Direct property access on store call
                {
                    code: `const userId = useUserStore().id;`,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'userStore',
                                storeCall: 'useUserStore',
                                property: 'id'
                            }
                        }
                    ]
                },

                // Direct method call on store
                {
                    code: `useUserStore().fetchUser();`,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'userStore',
                                storeCall: 'useUserStore',
                                property: 'fetchUser'
                            }
                        }
                    ]
                },

                // Chained property access (deeper nesting)
                {
                    code: `const userName = useUserStore().user.name;`,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'userStore',
                                storeCall: 'useUserStore',
                                property: 'user'
                            }
                        },
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'userStore',
                                storeCall: 'useUserStore',
                                property: 'property'
                            }
                        }
                    ]
                },

                // Multiple violations
                {
                    code: `
                        const userId = useUserStore().id;
                        const items = useCartStore().items;
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'userStore',
                                storeCall: 'useUserStore',
                                property: 'id'
                            }
                        },
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'cartStore',
                                storeCall: 'useCartStore',
                                property: 'items'
                            }
                        }
                    ]
                },

                // In template-like expression context
                {
                    code: `
                        const computed = () => useUserStore().isLoggedIn;
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'userStore',
                                storeCall: 'useUserStore',
                                property: 'isLoggedIn'
                            }
                        }
                    ]
                },

                // Different store naming patterns
                {
                    code: `const count = useCounterStore().count;`,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'counterStore',
                                storeCall: 'useCounterStore',
                                property: 'count'
                            }
                        }
                    ]
                },

                // Auth store pattern
                {
                    code: `const token = useAuthStore().token;`,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'noDirectStoreChaining',
                            data: {
                                storeName: 'authStore',
                                storeCall: 'useAuthStore',
                                property: 'token'
                            }
                        }
                    ]
                }
            ]
        });
    });
});
