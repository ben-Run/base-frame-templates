module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    //不允许出现不规则的空格
    "no-irregular-whitespace": 0,
    //不允许出现多余的空格
    "no-multi-spaces": 0,
    "no-useless-escape": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      "files": [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      "env": {
        "jest": true
      }
    }
  ]
}