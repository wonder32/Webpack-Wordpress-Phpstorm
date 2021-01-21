const path = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    StyleLintPlugin = require('stylelint-webpack-plugin'),
    webpack = require('webpack'),
    ImageminPlugin = require('imagemin-webpack-plugin').default;

// Paths.
const JS_DIR = path.resolve(__dirname, 'assets/src/js');
const BUILD_DIR = path.resolve(__dirname, 'assets/dist');

// Change edit these
const BUILD_DIR_PUBLIC = '/wp-content/themes/webpack-puddinq/assets/dist';
const WEBSITE_URL = 'https://dev.puddinq.com';
const SSL_WEBSITE_URL = 'https://dev.puddinq.com';
const SSL_KEY = 'C:\\wamp\\bin\\apache\\apache2.4.46\\conf\\key\\dev.puddinq.comnopass.key';
const SSL_CERT = 'C:\\wamp\\bin\\apache\\apache2.4.46\\conf\\key\\dev.puddinq.com.crt';

// process.on('warning', (warning) => {
//     console.log(warning.stack);
// });

module.exports = (env, options) => {
    return {
        mode: 'development',
        devtool: 'source-map',
        context: __dirname,
        entry: {
            main: JS_DIR + '/main.js',
            footer: JS_DIR + '/footer.js',
        },
        output: {
            path: BUILD_DIR,
            filename: 'js/[name].js',
        },
        externals: {
            jquery: 'jQuery',
            "jquery-ui": "jquiery-ui",
            "ajaxData": "ajaxData",
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: BUILD_DIR_PUBLIC,
                            },
                        },
                        {
                            loader: 'css-loader',
                            //options: { url: false }
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images/',
                                name: '[name].[ext]',
                                //emitFile: false
                            },
                        },
                        'img-loader',
                    ],
                },
            ],
        },
        plugins: [
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                disable: options.mode !== 'production', // Disable during development
                pngquant: {
                    quality: '95-100',
                },
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.ajaxData": "ajaxData",
                "jquery-ui": "jquery-ui",
                "window.jquery-ui": "jquery-ui",
            }),
            new StyleLintPlugin({
                files: 'assets/src/scss/**/*.(s(c|a)ss|css)',
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
            }),
            new BrowserSyncPlugin({
                host: WEBSITE_URL,
                port: 3000,
                files: '**/**.php',
                proxy: SSL_WEBSITE_URL,
                https: {
                    key: SSL_KEY,
                    cert: SSL_CERT,
                },
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                }),
            ],
        },
    };
};
