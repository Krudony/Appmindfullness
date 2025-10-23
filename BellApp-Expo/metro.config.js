const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimize Metro bundler for performance
config.maxWorkers = 2; // Better for modern systems
config.resolver.assetExts.push('bin', 'txt', 'jpg', 'png', 'svg', 'webp', 'mp3', 'wav');

// Configure transformer for better performance
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: false,
  output: {
    comments: false,
    beautify: false,
  },
};

// Watcher configuration for Windows
config.watchFolders = [__dirname];
config.resolver.nodeModulesPaths = [
  `${__dirname}/node_modules`,
];

// Web-specific optimizations
if (process.env.NODE_ENV === 'production') {
  config.transformer.minifierConfig.compress = {
    drop_console: true,
    drop_debugger: true,
  };
}

module.exports = config;