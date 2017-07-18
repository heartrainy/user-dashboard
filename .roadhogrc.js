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
      //"target": "http://localhost:3003/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
