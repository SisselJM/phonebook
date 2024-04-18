// eslint.config.js (new format)
import jsdoc from "eslint-plugin-jsdoc"; // Import the plugin

export default [
  {
    files: ["**/*.js"],
    plugins: {
      jsdoc, // Use the imported plugin
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
      // Add more rules as needed
    },
  },
];
