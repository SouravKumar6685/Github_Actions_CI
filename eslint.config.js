import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 🧠 Base JavaScript rules
  js.configs.recommended,

  // ⚛️ React + JSX rules
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["dist/**", "node_modules/**", "coverage/**", "*.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "react-refresh": reactRefresh,
    },
    rules: {
      // 🧹 Code cleanliness
      "no-unused-vars": ["warn", { 
        "vars": "all",
        "varsIgnorePattern": "^[A-Z_]", // Ignore uppercase (components & constants)
        "args": "after-used",
        "ignoreRestSiblings": true 
      }],
      "no-console": "off",

      // ⚛️ React-specific
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "error", // 👈 Add this
      "react/jsx-uses-vars": "error",  // 👈 Add this
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ♿ Accessibility
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/no-static-element-interactions": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // 🧪 Vitest environment
  {
    files: ["**/__tests__/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];