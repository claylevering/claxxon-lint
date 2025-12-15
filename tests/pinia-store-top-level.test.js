/**
 * Tests for the pinia-store-top-level rule
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../custom-rules/pinia-store-top-level.js';

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    }
});

describe('pinia-store-top-level', () => {
    it('should allow stores at top level in Vue files', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Top-level in Vue script setup
                {
                    code: `const userStore = useUserStore();`,
                    filename: 'Component.vue'
                },

                // Multiple stores at top level
                {
                    code: `
                        const userStore = useUserStore();
                        const cartStore = useCartStore();
                        const authStore = useAuthStore();
                    `,
                    filename: 'Component.vue'
                }
            ],
            invalid: []
        });
    });

    it('should allow stores in composable functions (non-Vue files)', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Top-level of composable function
                {
                    code: `
                        export function useAuth() {
                            const userStore = useUserStore();
                            return { user: userStore.user };
                        }
                    `,
                    filename: 'useAuth.js'
                },

                // Arrow function composable
                {
                    code: `
                        export const useAuth = () => {
                            const userStore = useUserStore();
                            return { user: userStore.user };
                        };
                    `,
                    filename: 'useAuth.js'
                },

                // TypeScript composable
                {
                    code: `
                        export function useAuth() {
                            const userStore = useUserStore();
                            return { user: userStore.user };
                        }
                    `,
                    filename: 'useAuth.ts'
                }
            ],
            invalid: []
        });
    });

    it('should allow stores in setup functions', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Options API setup function
                {
                    code: `
                        export default {
                            setup() {
                                const userStore = useUserStore();
                                return { userStore };
                            }
                        };
                    `,
                    filename: 'Component.vue'
                },

                // Arrow function setup
                {
                    code: `
                        export default {
                            setup: () => {
                                const userStore = useUserStore();
                                return { userStore };
                            }
                        };
                    `,
                    filename: 'Component.vue'
                }
            ],
            invalid: []
        });
    });

    it('should allow stores in defineStore setup functions', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Setup store pattern
                {
                    code: `
                        export const useCartStore = defineStore('cart', () => {
                            const userStore = useUserStore();
                            const items = ref([]);
                            return { items, userStore };
                        });
                    `,
                    filename: 'cart.js'
                },

                // With function expression
                {
                    code: `
                        export const useCartStore = defineStore('cart', function() {
                            const userStore = useUserStore();
                            return { userStore };
                        });
                    `,
                    filename: 'cart.js'
                }
            ],
            invalid: []
        });
    });

    it('should allow stores in plugin install functions', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Plugin with install method
                {
                    code: `
                        export default {
                            install(app) {
                                const userStore = useUserStore();
                                app.config.globalProperties.$user = userStore;
                            }
                        };
                    `,
                    filename: 'plugin.js'
                },

                // Arrow function install
                {
                    code: `
                        export default {
                            install: (app) => {
                                const userStore = useUserStore();
                                app.provide('user', userStore);
                            }
                        };
                    `,
                    filename: 'plugin.js'
                }
            ],
            invalid: []
        });
    });

    it('should disallow stores inside loops in Vue files', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [],
            invalid: [
                // For loop
                {
                    code: `
                        for (let i = 0; i < 10; i++) {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a for loop'
                            }
                        }
                    ]
                },

                // For...of loop
                {
                    code: `
                        for (const item of items) {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a for loop'
                            }
                        }
                    ]
                },

                // For...in loop
                {
                    code: `
                        for (const key in obj) {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a for loop'
                            }
                        }
                    ]
                },

                // While loop
                {
                    code: `
                        while (condition) {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a while loop'
                            }
                        }
                    ]
                },

                // Do...while loop
                {
                    code: `
                        do {
                            const userStore = useUserStore();
                        } while (condition);
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a while loop'
                            }
                        }
                    ]
                }
            ]
        });
    });

    it('should disallow stores inside conditionals in Vue files', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [],
            invalid: [
                // If statement
                {
                    code: `
                        if (condition) {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'an if statement'
                            }
                        }
                    ]
                },

                // Else branch
                {
                    code: `
                        if (condition) {
                            doSomething();
                        } else {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'an if statement'
                            }
                        }
                    ]
                }
            ]
        });
    });

    it('should disallow stores inside nested functions in Vue files', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [],
            invalid: [
                // Nested function declaration
                {
                    code: `
                        function handleClick() {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a function'
                            }
                        }
                    ]
                },

                // Arrow function
                {
                    code: `
                        const handleClick = () => {
                            const userStore = useUserStore();
                        };
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a function'
                            }
                        }
                    ]
                },

                // Callback function
                {
                    code: `
                        items.forEach(function(item) {
                            const userStore = useUserStore();
                        });
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a function'
                            }
                        }
                    ]
                },

                // Array method callback
                {
                    code: `
                        items.map((item) => {
                            const userStore = useUserStore();
                            return item;
                        });
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a function'
                            }
                        }
                    ]
                }
            ]
        });
    });

    it('should disallow stores inside try/catch in Vue files', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [],
            invalid: [
                // Try block
                {
                    code: `
                        try {
                            const userStore = useUserStore();
                        } catch (e) {}
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a try statement'
                            }
                        }
                    ]
                },

                // Catch block
                {
                    code: `
                        try {
                            doSomething();
                        } catch (e) {
                            const userStore = useUserStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a catch block'
                            }
                        }
                    ]
                }
            ]
        });
    });

    it('should disallow stores inside nested scopes in composables', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [],
            invalid: [
                // Nested function inside composable
                {
                    code: `
                        export function useAuth() {
                            function getUser() {
                                const userStore = useUserStore();
                                return userStore.user;
                            }
                            return { getUser };
                        }
                    `,
                    filename: 'useAuth.js',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a function'
                            }
                        }
                    ]
                },

                // Loop inside composable
                {
                    code: `
                        export function useAuth() {
                            for (let i = 0; i < 10; i++) {
                                const userStore = useUserStore();
                            }
                        }
                    `,
                    filename: 'useAuth.js',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'a for loop'
                            }
                        }
                    ]
                },

                // Conditional inside composable
                {
                    code: `
                        export function useAuth() {
                            if (condition) {
                                const userStore = useUserStore();
                            }
                        }
                    `,
                    filename: 'useAuth.js',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useUserStore',
                                scopeType: 'an if statement'
                            }
                        }
                    ]
                }
            ]
        });
    });

    it('should handle various store naming patterns', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Various valid store patterns at top level
                {
                    code: `
                        const userStore = useUserStore();
                        const authStore = useAuthStore();
                        const cartStore = useCartStore();
                        const settingsStore = useSettingsStore();
                        const notificationStore = useNotificationStore();
                    `,
                    filename: 'Component.vue'
                }
            ],
            invalid: [
                // Various stores in invalid locations
                {
                    code: `
                        if (condition) {
                            const authStore = useAuthStore();
                        }
                    `,
                    filename: 'Component.vue',
                    errors: [
                        {
                            messageId: 'storeNotTopLevel',
                            data: {
                                storeName: 'useAuthStore',
                                scopeType: 'an if statement'
                            }
                        }
                    ]
                }
            ]
        });
    });

    it('should not flag non-store functions', () => {
        ruleTester.run('pinia-store-top-level', rule, {
            valid: [
                // Functions that look like hooks but aren't stores
                {
                    code: `
                        if (condition) {
                            const data = useAsyncData();
                            const route = useRoute();
                            const router = useRouter();
                            const fetch = useFetch();
                        }
                    `,
                    filename: 'Component.vue'
                },

                // Regular function calls
                {
                    code: `
                        if (condition) {
                            const result = getData();
                            const user = fetchUser();
                        }
                    `,
                    filename: 'Component.vue'
                },

                // Hooks that start with 'use' but don't end with 'Store'
                {
                    code: `
                        for (const item of items) {
                            const state = useState();
                            const effect = useEffect();
                        }
                    `,
                    filename: 'Component.vue'
                }
            ],
            invalid: []
        });
    });
});
