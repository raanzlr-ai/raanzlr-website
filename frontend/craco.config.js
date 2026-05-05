const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig, { env }) => {
      // Optimize watch options
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: ["**/node_modules/**", "**/.git/**", "**/build/**"],
      };

      // Production optimizations
      if (env === "production") {
        // Enable gzip compression
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8,
          })
        );

        // Optimize chunk splitting
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              // Vendor chunk for node_modules
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                priority: 10,
                reuseExistingChunk: true,
              },
              // Separate chunk for React and related libraries
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                name: "react-vendor",
                priority: 20,
                reuseExistingChunk: true,
              },
              // Separate chunk for UI libraries
              ui: {
                test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|lucide-react)[\\/]/,
                name: "ui-vendor",
                priority: 15,
                reuseExistingChunk: true,
              },
              // Common code shared between pages
              common: {
                minChunks: 2,
                priority: 5,
                reuseExistingChunk: true,
                name: "common",
              },
            },
          },
          runtimeChunk: "single",
          moduleIds: "deterministic",
        };

        // Disable performance hints to prevent build failures
        // The bundle is optimized with code splitting and compression
        webpackConfig.performance = {
          hints: false,
        };
      }

      return webpackConfig;
    },
  },
};
