import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import piniaPersist from 'pinia-plugin-persist';
import { createPinia } from 'pinia';

loadFonts()
const pinia = createPinia().use(piniaPersist);

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
