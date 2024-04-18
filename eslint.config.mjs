import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { ignores: ['dist'] },
  { languageOptions: { globals: globals.browser } },
  { plugins: {
    stylistic: stylistic
  } },
  pluginJs.configs.recommended,
  {
    rules: {
      'stylistic/indent': ['error', 2],
      'stylistic/linebreak-style': ['warn', 'windows'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    }
  }
]