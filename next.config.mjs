import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime }) => {
    config.resolve.fallback = { fs: false };

    config.mode = 'production';

    config.plugins.push(
      new MiniCssExtractPlugin(),
    );

    config.optimization = {
      nodeEnv: 'production',
      minimize: true,
      chunkIds: 'named',
      concatenateModules: true,
      emitOnErrors: true,
      flagIncludedChunks: true,
      mangleExports: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              inline: 1,
              reduce_funcs: false,
              passes: 3,
              drop_debugger: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    };

    return config;
  },
};
