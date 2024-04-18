import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  {plugins: {
    stylistic: stylistic
  }},
  pluginJs.configs.recommended,
  {
    rules: {
        "stylistic/indent": "error",
        "stylistic/linebreak-style": "error",
        "stylistic/quotes": "error",
        "stylistic/semi": "error"
    }
  }
];