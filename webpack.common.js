const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const basePath = __dirname;
const { merge } = require("webpack-merge");

module.exports = merge(
    {},
    {
        context: path.join(basePath, "src"),
        resolve: {
            extensions: [".js", ".ts", ".tsx"]
        },
        entry: {
            app: "./index.tsx", 
            appStyles: ["./scssStyles.scss"],
        },
        output: {
            filename: "[name].[chunkhash].js",
            path: path.resolve(process.cwd(), "dist"),
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(png|jpg)$/,
                    type: "asset/resource",
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                import: false,
                                /* modules: {  *** UTILIZAR CUANDO DEFINA LAS CLASES PARA CSS-MODULES
                                    exportLocalsConvention: "camelCase",
                                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                    localIdentContext: path.resolve(__dirname, "src"),
                                    localIdentHashPrefix: "my-custom-hash",
                                }, */
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass")
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: './index.html',
            }),
            
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
        ],
    }
);