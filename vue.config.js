module.exports = {
  configureWebpack: {
    devtool: "inline-source-map",
    devServer: {
      quiet: true,
      disableHostCheck: true,
      host: 'localhost',
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      watchOptions: {
        ignored: [/node_modules/, /public\/\.cache/],
      },
    },
    target: 'node-webkit'
  },
};
