/**
 * Basic tests for @claxxon-lint/eslint-config
 * Tests that configurations can be imported and have the expected structure
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

// Import all configurations
import claxxonLint from '../index.js';
import { vue, vueRecommended, node, nodeRecommended, typescript, typescriptRecommended } from '../index.js';
import vueConfig from '../configs/vue.js';
import vueRecommendedConfig from '../configs/vue-recommended.js';
import nodeConfig from '../configs/node.js';
import nodeRecommendedConfig from '../configs/node-recommended.js';
import typescriptConfig from '../configs/typescript.js';
import typescriptRecommendedConfig from '../configs/typescript-recommended.js';

describe('ESLint Config Package', () => {
  
  describe('Default Export', () => {
    it('should export all configurations as default', () => {
      assert.ok(claxxonLint, 'Default export exists');
      assert.ok(claxxonLint.vue, 'Default export has vue');
      assert.ok(claxxonLint.vueRecommended, 'Default export has vueRecommended');
      assert.ok(claxxonLint.node, 'Default export has node');
      assert.ok(claxxonLint.nodeRecommended, 'Default export has nodeRecommended');
      assert.ok(claxxonLint.typescript, 'Default export has typescript');
      assert.ok(claxxonLint.typescriptRecommended, 'Default export has typescriptRecommended');
    });
  });

  describe('Named Exports', () => {
    it('should export all configurations as named exports', () => {
      assert.ok(vue, 'vue export exists');
      assert.ok(vueRecommended, 'vueRecommended export exists');
      assert.ok(node, 'node export exists');
      assert.ok(nodeRecommended, 'nodeRecommended export exists');
      assert.ok(typescript, 'typescript export exists');
      assert.ok(typescriptRecommended, 'typescriptRecommended export exists');
    });
  });

  describe('Vue Configuration', () => {
    it('should have correct structure for vue config', () => {
      assert.strictEqual(vueConfig.name, '@claxxon-lint/vue', 'Config has correct name');
      assert.ok(Array.isArray(vueConfig.files), 'Config has files array');
      assert.ok(vueConfig.languageOptions, 'Config has languageOptions');
      assert.ok(vueConfig.plugins, 'Config has plugins');
      assert.ok(vueConfig.rules, 'Config has rules');
      assert.ok(vueConfig.plugins.vue, 'Config has vue plugin');
    });

    it('should have correct structure for vue-recommended config', () => {
      assert.strictEqual(vueRecommendedConfig.name, '@claxxon-lint/vue-recommended', 'Config has correct name');
      assert.ok(Array.isArray(vueRecommendedConfig.files), 'Config has files array');
      assert.ok(vueRecommendedConfig.languageOptions, 'Config has languageOptions');
      assert.ok(vueRecommendedConfig.plugins, 'Config has plugins');
      assert.ok(vueRecommendedConfig.rules, 'Config has rules');
      assert.ok(vueRecommendedConfig.plugins.vue, 'Config has vue plugin');
    });

    it('should match **/*.vue files', () => {
      assert.ok(vueConfig.files.includes('**/*.vue'), 'Vue config matches .vue files');
    });
  });

  describe('Node Configuration', () => {
    it('should have correct structure for node config', () => {
      assert.strictEqual(nodeConfig.name, '@claxxon-lint/node', 'Config has correct name');
      assert.ok(Array.isArray(nodeConfig.files), 'Config has files array');
      assert.ok(nodeConfig.languageOptions, 'Config has languageOptions');
      assert.ok(nodeConfig.plugins, 'Config has plugins');
      assert.ok(nodeConfig.rules, 'Config has rules');
      assert.ok(nodeConfig.plugins.n, 'Config has n plugin');
    });

    it('should have correct structure for node-recommended config', () => {
      assert.strictEqual(nodeRecommendedConfig.name, '@claxxon-lint/node-recommended', 'Config has correct name');
      assert.ok(Array.isArray(nodeRecommendedConfig.files), 'Config has files array');
      assert.ok(nodeRecommendedConfig.languageOptions, 'Config has languageOptions');
      assert.ok(nodeRecommendedConfig.plugins, 'Config has plugins');
      assert.ok(nodeRecommendedConfig.rules, 'Config has rules');
      assert.ok(nodeRecommendedConfig.plugins.n, 'Config has n plugin');
    });

    it('should match JavaScript files', () => {
      assert.ok(nodeConfig.files.includes('**/*.js'), 'Node config matches .js files');
      assert.ok(nodeConfig.files.includes('**/*.mjs'), 'Node config matches .mjs files');
      assert.ok(nodeConfig.files.includes('**/*.cjs'), 'Node config matches .cjs files');
    });
  });

  describe('TypeScript Configuration', () => {
    it('should have correct structure for typescript config', () => {
      assert.strictEqual(typescriptConfig.name, '@claxxon-lint/typescript', 'Config has correct name');
      assert.ok(Array.isArray(typescriptConfig.files), 'Config has files array');
      assert.ok(typescriptConfig.languageOptions, 'Config has languageOptions');
      assert.ok(typescriptConfig.plugins, 'Config has plugins');
      assert.ok(typescriptConfig.rules, 'Config has rules');
      assert.ok(typescriptConfig.plugins['@typescript-eslint'], 'Config has typescript-eslint plugin');
    });

    it('should have correct structure for typescript-recommended config', () => {
      assert.strictEqual(typescriptRecommendedConfig.name, '@claxxon-lint/typescript-recommended', 'Config has correct name');
      assert.ok(Array.isArray(typescriptRecommendedConfig.files), 'Config has files array');
      assert.ok(typescriptRecommendedConfig.languageOptions, 'Config has languageOptions');
      assert.ok(typescriptRecommendedConfig.plugins, 'Config has plugins');
      assert.ok(typescriptRecommendedConfig.rules, 'Config has rules');
      assert.ok(typescriptRecommendedConfig.plugins['@typescript-eslint'], 'Config has typescript-eslint plugin');
    });

    it('should match TypeScript files', () => {
      assert.ok(typescriptConfig.files.includes('**/*.ts'), 'TypeScript config matches .ts files');
      assert.ok(typescriptConfig.files.includes('**/*.tsx'), 'TypeScript config matches .tsx files');
    });
  });

  describe('Flat Config Compatibility', () => {
    it('should have flat config compatible structure for all configs', () => {
      const configs = [
        vueConfig,
        vueRecommendedConfig,
        nodeConfig,
        nodeRecommendedConfig,
        typescriptConfig,
        typescriptRecommendedConfig
      ];

      configs.forEach((config) => {
        assert.ok(config.name, `${config.name} has a name property`);
        assert.ok(config.files, `${config.name} has a files property`);
        assert.ok(config.languageOptions || config.language, `${config.name} has language configuration`);
        assert.ok(config.plugins, `${config.name} has plugins`);
        assert.ok(config.rules, `${config.name} has rules`);
      });
    });
  });

  describe('Rules Content', () => {
    it('should have rules defined in custom configs', () => {
      assert.ok(Object.keys(vueConfig.rules).length > 0, 'Vue config has rules');
      assert.ok(Object.keys(nodeConfig.rules).length > 0, 'Node config has rules');
      assert.ok(Object.keys(typescriptConfig.rules).length > 0, 'TypeScript config has rules');
    });

    it('should have rules defined in recommended configs', () => {
      assert.ok(Object.keys(vueRecommendedConfig.rules).length > 0, 'Vue recommended config has rules');
      assert.ok(Object.keys(nodeRecommendedConfig.rules).length > 0, 'Node recommended config has rules');
      assert.ok(Object.keys(typescriptRecommendedConfig.rules).length > 0, 'TypeScript recommended config has rules');
    });
  });
});
