module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    // This seems to show false positive diagnostics. Disabling since TypeScript
    // provides import safety out of the box.
    'import/named': 'off'
  }
}
