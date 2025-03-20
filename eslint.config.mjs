import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['node_modules', '.next'] },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
