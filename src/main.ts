import { createApp } from 'vue'
import App from './App.vue'

import amplify from './modules/amplify'
import firebase from './modules/firebase'

const app = createApp(App)

app.use(amplify)
app.use(firebase)

app.mount('#app')
