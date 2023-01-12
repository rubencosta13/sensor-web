import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import cssLoaderConfig from 'css-loader';
import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.resolve.fallback = { fs: false };
    (config.mode = 'production'),
      config.plugins.push(new MiniCssExtractPlugin(), new CssMinimizerPlugin()),
      (config.optimization = {
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
              },
            },
          }),
        ],
      });

    return config;
  },
};
