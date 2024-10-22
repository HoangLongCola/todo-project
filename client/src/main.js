import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "notivue/notification.css";
import "notivue/animations.css";

import App from "./App.vue";
import router from "./router";
import { createNotivue } from "notivue";

const app = createApp(App);
const notivue = createNotivue({
  enqueue: false,
  limit: 1,
});

app.use(createPinia());
app.use(router);
app.use(notivue);
app.mount("#app");
