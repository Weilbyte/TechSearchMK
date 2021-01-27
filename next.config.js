const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer()

module.exports = {
  i18n: {
    locales: ['en-US', 'mk'],
    defaultLocale: 'en-US'
  }
}
