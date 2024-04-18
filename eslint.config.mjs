import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin-js';

export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.browser }},
  {plugins: {
    stylistic: stylistic
  }},
  pluginJs.configs.recommended,
  {
    rules: {
      'stylistic/indent': ['error', 2],
      'stylistic/linebreak-style': ['error', 'unix'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/semi': ['error', 'never']
    }
  }
];