// need to provide: entry point & output point

// path key below must have absolute path
// not relative path.
// __dirname gives current directory
// path.join to concatenate multiple paths
// so there aren't edge case issues

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// "devtool" allows various attributes
// including a source map
// that helps you figure out
// which JS file has the error
// instead of just giving the reference to bundle.js.
// 'cheap-module-eval-source-map'

// "yarn run dev-server" from the terminal
// (I forget where this is defined...)

// module.exports can either be an object or a function

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
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
            CSSExtract
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