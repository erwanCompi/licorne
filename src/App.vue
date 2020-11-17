<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="w-full max-w-xs">
            <form class="flex bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <button class="flex w-full mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" type="button">
                    <img class="w-6" src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="firebase logo">
                    <span>Firebase</span>
                </button>
                <button class="flex w-full mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Amplify
                </button>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Licorne Corp. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>
