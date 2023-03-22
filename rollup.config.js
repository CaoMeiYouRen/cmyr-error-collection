import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import analyzer from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'
import { upperFirst, camelCase } from 'lodash'
import { dependencies, peerDependencies, name } from './package.json'
import { defineConfig } from 'rollup'
const external = ['colors', 'parse-json', 'fast-safe-stringify', ...Object.keys({ ...dependencies, ...peerDependencies })]// 默认不打包 dependencies, peerDependencies
const outputName = upperFirst(camelCase(name))// 导出的模块名称 PascalCase
const env = process.env
const __PROD__ = env.NODE_ENV === 'production'
const __DEV__ = env.NODE_ENV === 'development'
const __ANALYZER__ = Boolean(env.ANALYZER)
function getPlugins({ isBrowser = false, isMin = false, isDeclaration = false }) {
    const plugins = []
    plugins.push(
        nodeResolve({
            browser: isBrowser,
            preferBuiltins: true,
        }),
    )
    plugins.push(
        typescript({
            tsconfig: 'tsconfig.json',
            module: 'esnext',
            target: 'es2019', // node >= 12
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            declaration: isDeclaration,
            sourceMap: false,
        }),
    )
    plugins.push(
        commonjs({
            sourceMap: false,
        }),
    )
    plugins.push(
        json({}),
    )
    plugins.push(
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'env.NODE_ENV': JSON.stringify(env.NODE_ENV),
            'process.env.__BROWSER__': JSON.stringify(String(isBrowser)),
            'process.env.__NODE__': JSON.stringify(String(!isBrowser)),
            preventAssignment: true,
        }),
    )
    if (isMin) {
        plugins.push(
            terser({
                module: true,
            }),
        )
    }
    if (__ANALYZER__) {
        plugins.push(
            analyzer({

            }),
        )
    }
    return plugins
}

export default defineConfig([
    {
        input: 'src/index.ts', // 生成类型文件
        external,
        output: {
            dir: 'dist',
            format: 'esm',
            name: outputName,

        },
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: true,
            isMin: false,
        }),
    },
    {
        input: 'src/index.ts',
        external,
        output: [
            {
                file: 'dist/index.js', // 生成 cjs
                format: 'cjs',
                name: outputName,
                sourcemap: false,
            },
            {
                file: 'dist/index.esm.js', // 生成 esm
                format: 'esm',
                name: outputName,
                sourcemap: false,
            },
        ],
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: false,
            isMin: false,
        }),
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.browser.js', // 生成 esm browser
            format: 'esm',
            name: outputName,
            sourcemap: false,
        },
        plugins: getPlugins({
            isBrowser: true,
            isDeclaration: false,
            isMin: false,
        }),
    },
    {
        input: 'src/index.ts',
        // external,
        output: [
            {
                file: 'dist/index.umd.js', // 生成 umd
                format: 'umd',
                name: outputName,
                sourcemap: false,
            },
            {
                file: 'dist/index.esm.browser.min.js', // 生成 esm browser min
                format: 'esm',
                name: outputName,
                sourcemap: false,
            },
        ],
        plugins: getPlugins({
            isBrowser: true,
            isDeclaration: false,
            isMin: true,
        }),
    },
    {
        input: 'src/custom.ts',
        external,
        output: [
            {
                file: 'dist/custom.cjs', // 生成 cjs
                format: 'cjs',
                name: outputName,
                sourcemap: false,
            },
            {
                file: 'dist/custom.mjs', // 生成 esm
                format: 'esm',
                name: outputName,
                sourcemap: false,
            },
        ],
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: false,
            isMin: false,
        }),
    },
])
