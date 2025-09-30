import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "cypress/**",
      "*.cjs",
      "*.mjs",
      "test-results.json"
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "no-empty": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Regras mais permissivas para CI/CD
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "no-useless-escape": "warn",
      "prefer-spread": "warn",
      "no-prototype-builtins": "warn",
      "no-cond-assign": "warn",
      "no-fallthrough": "warn",
      "react/no-unknown-property": "warn",
    },
  },
];
