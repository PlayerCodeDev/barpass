import baseConfig from "../../eslint.config.js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  ...baseConfig,
  pluginReact.configs.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
        ecmaFeatures: { jsx: true },
      },
      globals: { React: "writable" },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
    ignores: ["dist/**", "build/**"],
  },
];

