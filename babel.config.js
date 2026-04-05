module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@ui': './src/ui',
                    '@app': './src/app',
                    '@assets': './src/assets',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
