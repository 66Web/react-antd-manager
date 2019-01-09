const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
    config = injectBabelPlugin(
    //  ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], //直接修改less变量
        config,
     );
     config = rewireLess.withLoaderOptions({
           modifyVars: { "@primary-color": "#f9c700" },
           javascriptEnabled: true,
     })(config, env);
     return config;
  };