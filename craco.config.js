/* craco.config.js */
const path = require('path')
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')
module.exports = () => {
  return {
    babel: {
      // presets: [
      //   [
      //     '@babel/preset-env',
      //     {
      //       modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
      //       useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
      //       // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
      //       // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
      //       corejs: {
      //         version: 3, // 使用core-js@3
      //         proposals: false
      //       }
      //     }
      //   ]
      // ],
      plugins: [
        // 配置 babel-plugin-import
        ['import', { libraryName: 'antd', style: 'css' }]
      ]
      // loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions }
    },
    webpack: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      {
        plugin: reactHotReloadPlugin
      }
    ]
  }
}
