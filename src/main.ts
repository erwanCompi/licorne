import { createApp } from 'vue'
import App from './App.vue'

import amplify from './modules/amplify'

const app = createApp(App)

app.use(amplify)

app.mount('#app')
