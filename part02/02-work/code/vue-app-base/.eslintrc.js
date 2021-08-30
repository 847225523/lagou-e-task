module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/essential',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'vue',
        'html',
        // 'standard',
        'promise'
    // standard风格的依赖包
    // standard风格的依赖包
    ],
    rules: {
    // allow paren-less arrow functions

        'arrow-parens': 0,
        indent: ['error', 4],
        // allow async-await

        'generator-star-spacing': 0
    }
}
