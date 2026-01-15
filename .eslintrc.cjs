// ESLint configuration for the project, using Airbnb base and Prettier
module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ["dist"],
  // We extend airbnb and prettier to ensure they work together
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
      },
    },
  },
  rules: {
    // Mini-task solution: Allow the use of _id (underscore dangle)
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": "off",
    "no-new": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "server.js",
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
  ],
};

