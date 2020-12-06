module.exports = {
  plugins: ['import', 'prettier', 'standard', 'jest'],
  extends: ['standard', 'prettier', 'prettier/standard', 'plugin:jest/style'],
  parserOptions: {
    ecmaVersion: 2018,
  },
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
