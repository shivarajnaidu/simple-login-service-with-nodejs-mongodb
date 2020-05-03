module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'script',
    ecmaFeatures: {
      modules: false
    }
  },
  rules: {
    'strict': ['error', 'global'],
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'no-restricted-syntax': [
      'off',
      'ForOfStatement'
    ],
  },
};