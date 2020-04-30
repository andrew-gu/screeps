import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/main.js',
        format: 'cjs',
        exports:'named'
    },
    plugins: [
        commonjs({
            include: 'src/**',
            exclude: undefined,
            extensions: ['.js'],
        })
    ]
};