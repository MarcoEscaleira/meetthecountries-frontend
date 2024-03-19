import { defineConfig } from "cypress";
import { CypressCommonConfig, CypressE2eCommonConfig } from "./common.config";

export default defineConfig({
  ...CypressCommonConfig,
  projectId: "6ipboc",
  e2e: {
    ...CypressE2eCommonConfig,
    specPattern: "cypress/e2e/journeys/**/*.dev.feature",
    baseUrl: "http://localhost:3000",
  },
});
