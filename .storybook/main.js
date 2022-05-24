// module.exports = {
//     "stories": [
//         "../src/**/*.stories.mdx",
//         "../src/**/*.stories.@(js|jsx|ts|tsx)"
//     ],
//     "addons": [
//         "@storybook/addon-links",
//         "@storybook/addon-essentials",
//         "@storybook/addon-interactions",
//         "@storybook/preset-create-react-app"
//     ],
//     "framework": "@storybook/react"
// }

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.stories\.tsx?$/],
                },
                loaderOptions: {
                    prettierConfig: {
                        printWidth: 80, singleQuote: false,
                        options: {parser: 'typescript'}
                    },
                },
            },
        }
    ],
};