import path from "path";
import { Configuration } from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolve";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(),
        },
        resolve: buildResolvers(),
        devtool: isDev ? "inline-source-map" : undefined,
        devServer: buildDevServer(options),
    };
}
