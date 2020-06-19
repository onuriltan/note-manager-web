module.exports = {
  plugins: ['import', 'prettier', 'standard', 'jest'],
  extends: ['standard', 'prettier', 'prettier/standard', 'plugin:jest/style'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'space-before-function-paren': 0,
    'new-cap': 0,
    'prettier/prettier': 2,
    'no-console': 1,
    'require-await': 2,
  },
}
