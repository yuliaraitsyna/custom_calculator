import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        __dirname: "readonly",
      },
    },
    ignores: ["dist/**", "webpack.config*.js"],
  },
  pluginJs.configs.recommended,
  {
    files: ["webpack.config*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
];