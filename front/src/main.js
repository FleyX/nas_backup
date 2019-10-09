import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.defaults.baseURL = "/backup/api";
axios.interceptors.response.use(
  function(res) {
    return res.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
