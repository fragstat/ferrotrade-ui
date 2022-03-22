import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";
import VueHtmlToPaper from "vue-html-to-paper"

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    'http://localhost:80/assets/css/card.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.config.productionTip = false;
Vue.prototype.$hostname = (Vue.config.productionTip) ? 'http://ferro-trade.ru:80' :'http://localhost:80'
Vue.use(Notifications)
Vue.use(VueHtmlToPaper, options)

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
