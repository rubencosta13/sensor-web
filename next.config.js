const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const outputDir = './wwwroot/dist'
const entry = './wwwroot/js/app.js'
const cssOutput = 'site.css'

const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = {
  compiler: {
    styledComponents: true | {
      minify: true
    },
  }
};

module.exports = (env) => { 
  return [{
      entry: entry,
      output: {
          path: path.join(__dirname, outputDir),
          filename: '[name].js',
          publicPath: '/dist/'
      },
      module: {
          rules: [
              {
                  test: /\.js$/,
                  use: 'babel-loader'
              },
              {
                  test: /\.css$/,
                  use: ExtractTextPlugin.extract({
                      use: ['css-loader'],
                      fallback: 'style-loader'
                  })
              },
              {
                  test: /\.scss$/,
                  use: ExtractTextPlugin.extract({
                      use: ['css-loader', 'sass-loader' ],
                      fallback: 'style-loader'
                  })
              }
          ]
      },
      plugins: [
          new ExtractTextPlugin(cssOutput),
          new PurgecssPlugin({
              paths: glob.sync('./Views/**/*.cshtml', { nodir: true }),
              whitelistPatterns: [ /selectize-.*/ ]
          })
      ]
  }]
}

module.exports = withCss(withPurgeCss({
  purgeCssPaths: [
    "pages/**/*",
    "components/**/*",
  ],
  purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
}));

module.exports = withBundleAnalyzer({
  images: {
    domains: ['i.imgur.com', 'sensor.community'],
  },
  swcMinify: true, 
  optimizeFonts: true,
});