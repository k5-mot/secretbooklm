import pluginEslint from "@eslint/js";
import pluginPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import pluginTypescript from "typescript-eslint";

export default defineConfig([
	{
		ignores: ["dist`"],
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: { globals: globals.browser },
	},
	pluginEslint.configs.recommended,
	pluginTypescript.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginPrettier,
]);
