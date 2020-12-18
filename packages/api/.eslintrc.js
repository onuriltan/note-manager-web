module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  plugins: ['prettier'],
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
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
}
