import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node, // Use Node.js global variables
    },
    plugins: { js },
    extends: ["eslint:recommended"],
    rules: {
      "no-console": "warn", // Warn for console logs
      "indent": ["error", 2], // Enforce 2-space indentation
      "quotes": ["error", "double"], // Use double quotes
      "semi": ["error", "always"], // Require semicolons
      "no-unused-vars": ["warn"], // Warn for unused variables
      "comma-dangle": ["error", "never"] // No trailing commas
    }
  }
]);
