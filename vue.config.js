module.exports = {
    configureWebpack: {
        devServer: {
            watchOptions: {
                ignored: [/node_modules/, /public\/\.cache/],
            },
        },
        target: 'node-webkit'
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
        },
    },
};
