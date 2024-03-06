module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',

  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-explicit-any': 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-debugger": 0
  },
  settings: {
    react: {
      'version': 'detect'
    },
    'import/resolver': {
      'alias': {
        map: [
          ["@", "./src"]
        ]
      },
      'extensions': ['.ts', '.tsx']
    }
  }
}
