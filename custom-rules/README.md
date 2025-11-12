# Custom ESLint Rules

This directory contains custom ESLint rules for `@claxxon-lint/eslint-config`.

## Available Rules

### `vue-component-name-the`

**Type:** Suggestion  
**Severity:** Warning (configurable)

Requires all Vue component names to contain the word "The".

#### Rule Details

This rule enforces a naming convention where all Vue components must have "The" in their name. This is useful for maintaining consistent component naming patterns in your codebase.

**Examples of incorrect code:**

```vue
<script>
export default {
  name: 'HelloWorld'
}
</script>
```

```vue
<script>
export default {
  name: 'MyComponent'
}
</script>
```

**Examples of correct code:**

```vue
<script>
export default {
  name: 'TheHelloWorld'
}
</script>
```

```vue
<script>
export default {
  name: 'TheMyComponent'
}
</script>
```

```vue
<script>
export default {
  name: 'MyTheComponent'
}
</script>
```

#### Usage

This rule is automatically included in the `vue-with-custom` configuration:

```javascript
import { vueWithCustom } from '@claxxon-lint/eslint-config';

export default [vueWithCustom];
```

Or use it in your own configuration:

```javascript
import { customRules } from '@claxxon-lint/eslint-config';

export default [
  {
    files: ['**/*.vue'],
    plugins: {
      'claxxon-lint': customRules
    },
    rules: {
      'claxxon-lint/vue-component-name-the': 'warn' // or 'error'
    }
  }
];
```

## Creating New Custom Rules

To add a new custom rule:

1. Create a new file in this directory (e.g., `my-rule.js`)
2. Export a rule object with `meta` and `create` properties
3. Add the rule to `index.js`
4. Update documentation

Example template:

```javascript
export default {
  meta: {
    type: 'suggestion', // or 'problem', 'layout'
    docs: {
      description: 'description of the rule',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null, // or 'code', 'whitespace'
    schema: [] // rule options schema
  },

  create(context) {
    return {
      // AST node visitors
    };
  }
};
```
