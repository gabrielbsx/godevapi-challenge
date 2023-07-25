module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        "es2021": true,
        "node": true
    },
    extends: 'standard-with-typescript',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
    }
}
