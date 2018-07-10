// need to provide: entry point & output point

// path key below must have absolute path
// not relative path.
// __dirname gives current directory
// path.join to concatenate multiple paths
// so there aren't edge case issues

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// process.env.NODE_ENV
// Heroku automatically sets it to "production"
// We will have "test" (test) and "undefined" (dev)
// OS-dependent though. We'll use an npm module npm-cross-env
// NPM module dotenv reads files for us
// webpack DefinePlugin() allows us to read in the file securely
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // will be 'development' if undefined

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

// "devtool" allows various attributes
// including a source map
// that helps you figure out
// which JS file has the error
// instead of just giving the reference to bundle.js.
// 'cheap-module-eval-source-map'

// "yarn run dev-server" from the terminal
// (see package.json)

// module.exports can either be an object or a function

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: [
            'babel-polyfill',
            './src/app.js'
        ],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist'
        }
    };
};

// 'style-loader' handled inline styles
// we don't need it now that we're using the extract-text-webpack-plugin