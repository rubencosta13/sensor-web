module.exports = {
    webpackDevMiddleware: (config) => {
      config.watchOptions.poll = 300;
      return config;
    },
    images: {
      domains: ['i.imgur.com', 'sensor.community'],
    },
};