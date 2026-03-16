const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://www.cnarios.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'report',
      overwrite: false,
      html: true,
      json: true,
    },
  },
})
