module.exports = {
    env: {
        /* (i) An environment provides predefined global variables */
        browser: true, // Browser global variables
        node: true, // Node.js global variables and Node.js scoping
        es2021: true, // Adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        tsconfigRootDir: __dirname, // Required by `@typescript-eslint/recommended-requiring-type-checking`
        project: ['./tsconfig.json'], // Required by `@typescript-eslint/recommended-requiring-type-checking`
        ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allow imports of code placed in ECMAScript modules
        ecmaFeatures: {
            /* (i) Which additional language features you'd like to use */
            jsx: true, // Enable JSX
        },
    },
    plugins: [
        /* (i) Place to define plugins, normally there is no need for this as "extends" will automatically import the plugin */
    ],
    extends: [
        'eslint:recommended', // Rules recommended by ESLint (eslint)
        'plugin:@typescript-eslint/recommended', // TypeScript rules (@typescript-eslint/eslint-plugin)
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // Linting with Type Information. More info: https://git.io/JEDmJ (@typescript-eslint/eslint-plugin)
        'plugin:react/recommended', // React rules (eslint-plugin-react)
        'plugin:react-hooks/recommended', // React Hooks rules (eslint-plugin-react-hooks)
        'plugin:jsx-a11y/recommended', // Accessibility rules (eslint-plugin-jsx-a11y)
        'plugin:import/errors', // Recommended errors for import (eslint-plugin-import)
        'plugin:import/warnings', // Recommended warnings for import (eslint-plugin-import)
        'plugin:import/typescript', // Typescript support for the import rules (eslint-plugin-import)
        'plugin:promise/recommended', // Enforce best practices for JavaScript promises (eslint-plugin-promise)
        'plugin:@next/next/recommended', // Import Next.js specific ESLint rules (eslint-plugin-next)
        'plugin:prettier/recommended', // This will display Prettier errors as ESLint errors. (!) Make sure this is always the last configuration in the extends array. (eslint-plugin-prettier & eslint-config-prettier)
    ],
    rules: {
        /* (i) Place to specify ESLint rules. Can be used to overwrite rules specified by the extended configs */

        // Define extensions that shouldn't be specified on import
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
            },
        ],

        // Enforce a convention in module import order
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                },
                // this is the default order except for added `internal` in the middle
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'never',
            },
        ],

        // Warning for console logging
        'no-console': 'warn',

        // Spaced-comments convention
        'spaced-comment': [
            'warn',
            'always',
            {
                block: {
                    balanced: true,
                },
            },
        ],

        // Unused variables
        'no-unused-vars': 'off', // Disable base rule
        '@typescript-eslint/no-unused-vars': [
            // Overide rule to add ignore pattern
            'warn', // or error
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],

        // React rules
        'react/prop-types': 0, // Disable the requirement for prop types definitions, we will use TypeScript's types for component props instead
        'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }], // Allow JSX only in `.tsx` files
        'react/react-in-jsx-scope': 0, // Rule not needed in React 17
        'react/destructuring-assignment': 2, // Always destructure props
        'react/jsx-curly-brace-presence': [
            2,
            { props: 'never', children: 'never' },
        ], // Disallow unnecessary curly braces in JSX props/children
        'react/jsx-newline': [1, { prevent: true }], // Prevent new line after JSX elements
        'react/self-closing-comp': 1, // Components without children can be self-closed to avoid unnecessary extra closing tag
        'react/display-name': 0, // Disable mandatory component display name

        // TypeScript rules
        '@typescript-eslint/no-misused-promises': 1, // Warning only

        // React Hooks rules
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks hook dependencies
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto', // Set EOF automatically
            },
        ],
    },
    settings: {
        react: {
            version: 'detect', // Tells `eslint-plugin-react` to automatically detect the version of React to use
        },
        // Enable absolute imports from root
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
                moduleDirectory: ['node_modules', './'],
            },
        },
    },
    ignorePatterns: [
        '*.js',
        'dist',
        'build',
        'public/**',
        'next-env.d.ts',
        'libs/types/*',
    ],
};
