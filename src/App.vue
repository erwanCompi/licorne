<template>
    <div class="w-screen h-screen flex">
        <div class="w-1/2 flex flex-col items-center justify-center">
            <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div class="mb-4">
                    <h1 class="text-grey-900">Todo List (aws)</h1>
                    <div class="flex mt-4">
                        <input @keyup.enter="addAwsTodo()" v-model="awsInput" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-700" placeholder="Add Todo">
                        <button @click="addAwsTodo()" class="flex-no-shrink p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">Add</button>
                    </div>
                </div>
                <div>
                    <div v-for="todo in awsTodos" :key="todo" class="flex mb-4 items-center">
                        <p class="w-full text-grey-darkest">{{ todo.name }}</p>
                        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-500 hover:bg-green-500">Done</button>
                        <button @click="deleteAwsTodo(todo.id)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500">Remove</button>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div class="mb-4">
                    <h1 class="text-grey-900">Todo List (firebase)</h1>
                    <div class="flex mt-4">
                        <input @keyup.enter="addfirebaseTodo()" v-model="firebaseInput" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-700" placeholder="Add Todo">
                        <button @click="addfirebaseTodo()" class="flex-no-shrink p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">Add</button>
                    </div>
                </div>
                <div>
                    <div v-for="(todo, id) in firebaseTodos" :key="todo" class="flex mb-4 items-center">
                        <p class="w-full text-grey-darkest">{{ todo.name }}</p>
                        <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-500 hover:bg-green-500">Done</button>
                        <button @click="deleteFirebaseTodo(id)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500">Remove</button>
                    </div>
                </div>
            </div>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Licorne Corp. All rights reserved.
            </p>
        </div>
        <div class="w-1/2 flex items-center justify-center">
            <div class="w-full max-w-xs">
                <form class="flex bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <button @click="firebaseAuth()" class="flex w-full mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" type="button">
                        <img class="w-6 h-6" src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase logo">
                        <span class="ml-1">Firebase</span>
                        <span>{{ firebaseUserLogIn ? '✅' : '❌' }}</span>
                    </button>
                    <button @click="awsAuth()" class="flex w-full mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" type="button">
                        <img class="w-6 h-6" src="https://raw.githubusercontent.com/aws-amplify/aws-amplify.github.io/master/images/Logos/Amplify%20Logo.svg" alt="">
                        <span class="ml-1">Amplify</span>
                        <span>{{ awsUserLogIn ? '✅' : '❌' }}</span>
                    </button>
                </form>
                <p class="text-center text-gray-500 text-xs">
                    &copy;2020 Licorne Corp. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import API, { graphqlOperation } from '@aws-amplify/api';

import { listTodos } from './graphql/queries'
import { createTodo, deleteTodo } from './graphql/mutations'
import * as subscriptions from './graphql/subscriptions';

import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDCDE07eHLS2Y0vf9jVY3N4LJCHgnidvkU",
  authDomain: "dragon-b4827.firebaseapp.com",
  databaseURL: "https://dragon-b4827.firebaseio.com",
  projectId: "dragon-b4827",
  storageBucket: "dragon-b4827.appspot.com",
  messagingSenderId: "1016074562328",
  appId: "1:1016074562328:web:5fa5ccaabcc5640f3c4c6d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function getTodos() {
    const allEvents: any = await API.graphql(graphqlOperation(listTodos));

    return allEvents
}

export default defineComponent({
    setup () {
        const user = {
            email: 'licorne@submary.com',
            password: 'licorne'
        }

        // Firebase
        const firebaseUserLogIn = ref(false)
        const firebaseInput = ref('')
        const firebaseTodos = ref()
        const dbRefObject = firebase.database().ref().child('todos')

        dbRefObject.on('value', snap => { 
            console.log(snap.val())
            firebaseTodos.value = snap.val()
        })

        

        // Aws

        type Todo = {
            id: String,
            name: String
        }

        const awsTodos = ref([])
        const awsInput = ref('')
        const awsUserLogin = ref(false)

        onMounted(async () => {

            // const firestore = database
            // console.log(firestore)

            const createTodo = await API.graphql(graphqlOperation(subscriptions.onCreateTodo))
            const deleteTodo = await API.graphql(graphqlOperation(subscriptions.onDeleteTodo))

            // @ts-ignore
            createTodo.subscribe({
                next: (todoData: any) => {
                    // @ts-ignore
                    awsTodos.value.push(todoData.value.data.onCreateTodo)
                }
            })

            // @ts-ignore
            deleteTodo.subscribe({
                next: (todoData: any) => {
                    // @ts-ignore
                    const removeIndex = awsTodos.value.map((item) => { return item.id }).indexOf(todoData.value.data.onDeleteTodo.id)

                    awsTodos.value.splice(removeIndex, 1)
                }
            })
        })

        onUnmounted(() => {
            // @ts-ignore
            createTodo.unsubscribe();
            // @ts-ignore
            deleteTodo.unsubscribe();
        })
        
        getTodos().then(res => {
            awsTodos.value = res.data.listTodos.items
        })

        return { user, awsTodos, awsInput, firebaseUserLogIn, awsUserLogin, firebaseTodos, firebaseInput }
    },
    methods: {
        firebaseAuth() {
            // @ts-ignore
            firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(() => {
                this.firebaseUserLogIn = true
            })
        },
        addfirebaseTodo() {
            const todo = { name: this.firebaseInput }
            var newPostKey = firebase.database().ref().child('todos').push().key;
            firebase.database().ref('todos/' + newPostKey).set(todo);
            this.firebaseInput = ''
        },
        deleteFirebaseTodo(id: string) {
            firebase.database().ref(`todos/${id}`).remove()
        },
        async addAwsTodo() {
            if (!this.awsInput.length) {
                return
            }

            const eventDetails = {
                name: this.awsInput,
            }

            await API.graphql(graphqlOperation(createTodo, { input: eventDetails }));
            this.awsInput = ''
        },
        async deleteAwsTodo(id: string) {

            const eventDetails = {
                id: id,
            }

            await API.graphql(graphqlOperation(deleteTodo, { input: eventDetails }));
        }
    }
})
</script>

<style scoped>

</style>
