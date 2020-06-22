module.exports = {
    configureWebpack: {
        devServer: {
            watchOptions: {
                ignored: [/node_modules/, /public\/\.cache/],
            },
        },
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
        },
    },
};
