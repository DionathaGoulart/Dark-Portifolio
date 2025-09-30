module.exports = {
  env: {
    'vitest-globals/env': true,
    'cypress/globals': true
  },
  extends: [
    './eslint.config.js',
    'plugin:vitest-globals/recommended',
    'plugin:cypress/recommended'
  ],
  plugins: ['vitest-globals', 'cypress'],
  rules: {
    // Allow test files to use any
    '@typescript-eslint/no-explicit-any': 'off',
    // Allow test files to use console
    'no-console': 'off',
    // Allow test files to use unused vars
    '@typescript-eslint/no-unused-vars': 'off',
    // Allow test files to use require
    '@typescript-eslint/no-var-requires': 'off'
  }
}
