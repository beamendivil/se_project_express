// ESLint configuration for the project, using Airbnb base and Prettier
module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ["dist", ".eslintrc.js"],
  // We extend airbnb and prettier to ensure they work together
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
    react: {
      version: "18.2",
    },
  },
  rules: {
    // Mini-task solution: Allow the use of _id (underscore dangle)
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/prop-types": "off",
    "no-console": "off",
    "no-new": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "server.js",
          "vite.config.js",
          "**/*.test.js",
          "**/*.spec.js",
        ],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "always",
        jsx: "always",
      },
    ],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    // Frontend (Vite/React) uses extension-less imports; allow that in src/
    {
      files: ["src/**/*.{js,jsx}", "src/**"],
      rules: {
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            js: "never",
            jsx: "never",
          },
        ],
      },
    },
  ],
};

