<script setup>
    import { useRouter } from "vue-router";
    import { useUserStore } from "../../stores/ServiceUser.js";
    import User from '../../classes/user.js';
    import { createApp } from 'vue';
    import AppTaskForm from "../components/TaskForm.vue";

  const router = useRouter();
  const userStore = useUserStore();
  const app = createApp({});
  app
    .component('AppTaskForm', AppTaskForm)

</script>
    
<template>
  <AppTaskForm/>
</template>

<style scoped>
</style>
    