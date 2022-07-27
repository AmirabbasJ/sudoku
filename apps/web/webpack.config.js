const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    node: {
      global: true,
    },
    module: {
      rules: [
        {
          test: /\.ttf$/,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]',
          },
        },
      ],
    },
  });
};
