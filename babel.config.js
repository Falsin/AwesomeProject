module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      [
        '@babel/preset-env',
        {
          targets: {node: 'current'},
          loose: true,
          shippedProposals: true
        }
      ]
    ],
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  };
};
