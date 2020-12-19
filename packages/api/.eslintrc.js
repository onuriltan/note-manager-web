module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jest', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'max-len': [2, 120, 4],
    'space-before-function-paren': 0,
    'new-cap': 0,
    'prettier/prettier': 2,
    'no-console': 2,
    'require-await': 2,
  },
}
