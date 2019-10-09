module.exports = {
  devServer: {
    proxy: {
      "/backup/api": {
        target: "http://localhost:8080/", //对应自己的接口
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   "^/api": ""
        // }
      }
    }
  }
};
