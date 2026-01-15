// .eslintrc.js
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  // We extend airbnb and prettier to ensure they work together
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
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
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Mini-task solution: Allow the use of _id (underscore dangle)
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
