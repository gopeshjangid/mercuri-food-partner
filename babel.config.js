module.exports = (api) => {
  api.cache(true);

  return {
      presets:
      [ // NextJS babel presets
        [
            'next/babel', {
                'preset-env': {
                    targets: {
                        browsers: '> 1%',
                        ie: '11',
                    },
                },
            },
        ],
    ],
      plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-syntax-dynamic-import',
          'react-loadable/babel',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-transform-runtime', // Run localhost IE11 activate and install it
      ],
      env: {
          test: {
              plugins: [
                  '@babel/plugin-transform-modules-commonjs',
                  'transform-export-extensions',
              ],
          },
      },
  };
};
