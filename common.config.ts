import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export const CypressE2eCommonConfig = {
  excludeSpecPattern: "*.ts",
  testIsolation: true,
  async setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
  ): Promise<Cypress.PluginConfigOptions> {
    await addCucumberPreprocessorPlugin(on, config);
    return config;
  },
};

export const CypressCommonConfig = {
  video: true,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 150000,
  requestTimeout: 150000,
  watchForFileChanges: false,
  numTestsKeptInMemory: 50,
  viewportHeight: 900,
  viewportWidth: 1440,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: CypressE2eCommonConfig,
};
