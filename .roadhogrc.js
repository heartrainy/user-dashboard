export default {
  "entry": "src/index.js",
  "theme": "./theme.config.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  },
  "proxy": {
    "/api": {
      "target": "http://106.14.4.79:58080/ilvdo-bizsys/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
