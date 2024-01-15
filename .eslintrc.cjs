module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  globals: {
    document: "readonly",
    window: "readonly",
    __API_SERVICE__: "readonly",
    __MAPBOX_TOKEN__: "readonly",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts", '__generated__'],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  plugins: ["react-refresh", "jsx-a11y", "import"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "off",
    "import/no-unresolved": "error",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
