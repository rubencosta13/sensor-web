import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
	) => {
		(config.mode = 'production'),
			// config.module.rules.push({
			// 	test: /\.css$/i,
			// 	exclude: path.resolve(__dirname, 'node_modules'),
			// 	use: ['style-loader', 'css-loader'],
			// }),
			config.plugins.push(
				new webpack.DefinePlugin({
					'process.env': {
						// This has effect on the react lib size
						NODE_ENV: JSON.stringify('production'),
					},
				}),
				new CssMinimizerPlugin(),
			),
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
