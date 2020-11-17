import { createApp } from 'vue'
import App from './App.vue'

import amplify from './modules/amplify.ts'
import firebase from './modules/firebase.ts'

console.log(amplify)
console.log(firebase)

createApp(App).mount('#app')
