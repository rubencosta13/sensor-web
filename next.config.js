module.exports = {
    webpackDevMiddleware: (config) => {
      config.watchOptions.poll = 300;
      return config;
    },
    images: {
      domains: ['i.imgur.com', 'sensor.community'],
    },
    "plugins": [
      "postcss-flexbugs-fixes",
      [
        "postcss-preset-env",
        {
          "autoprefixer": {
            "flexbox": "no-2009"
          },
          "stage": 3,
          "features": {
            "custom-properties": false
          }
        }
      ],
      [
        '@fullhuman/postcss-purgecss',
        {
          content: [
              './pages/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}'
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          safelist: ["html", "body"]
        }
      ],
    ]
};