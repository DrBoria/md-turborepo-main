const baseConfig = require("./base.js");
// import { FlatCompat } from "@eslint/eslintrc";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

module.exports = [
  ...baseConfig,
  // ...compat.extends("@react-native-community"),
  {
    files: ["**/*.ts", "**/*.tsx"],
  },
];
