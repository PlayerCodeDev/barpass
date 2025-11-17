import baseConfig from "../../eslint.config.js";
import pluginNode from "eslint-plugin-node";

export default [
  ...baseConfig,
  pluginNode.configs["recommended-module"],
  {
    languageOptions: {
      globals: {
        ...pluginNode.environments.node.globals,
      },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
    },
    rules: {
      "node/no-unsupported-features/es-syntax": "off",
      "node/no-missing-import": "off",
      "node/no-exports-assign": "error",
    },
    ignores: ["dist/**"],
  },
];
