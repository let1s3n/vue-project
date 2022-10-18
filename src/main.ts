import { createApp } from "vue";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./assets/index.css";
library.add(faMagnifyingGlass)
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app");
