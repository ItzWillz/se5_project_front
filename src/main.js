import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import vuetify from "./plugins/vuetify.js";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
//import "primeicons/primeicons.css";
import "./style.css";

import PrimeVue from "primevue/config";
import Listbox from "primevue/listbox";

createApp(App).use(PrimeVue, {ripple: true}).use(vuetify).use(router).component('list-box', Listbox).mount("#app");
