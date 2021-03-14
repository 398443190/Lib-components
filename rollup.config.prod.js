const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const inputPath = path.resolve(__dirname, './src/index.js')
const rollupCommonjs = require('rollup-plugin-commonjs')
const outputUmdPath = path.resolve(__dirname, './dist/output-umd-prod.js')
const outputESPath = path.resolve(__dirname, './dist/output-es-prod.js')
export default {
    input: inputPath,
    output: [{
        file: outputUmdPath,
        format: 'umd',
        name: 'huanglu',
        globals: {
            vue: 'vue'
        }
    }, {
        file: outputESPath,
        format: 'es',
        name: 'huanglu',
        globals: {
            vue: 'vue'
        }
    }],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false,
                "version": "7.0.0-beta.0"
            }
        ],
        vue(),
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        rollupCommonjs(),
        json(),
        postcss({
            plugins: []
        }),
        // terser(), // 实现生产代码压缩
    ],
    external: [
        'vue'
    ]
}