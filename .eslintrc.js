module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: ["eslint:recommended", "plugin:vue/recommended"],
  plugins: ["vue"],
  rules: {
    semi: [2, "never"],
    "vue/max-attributes-per-line": "off",
  },
}
