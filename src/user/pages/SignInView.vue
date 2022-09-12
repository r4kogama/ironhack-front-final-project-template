<script setup>
  import AppSingIn from '../components/SignInComponent.vue';
  import { useRouter } from "vue-router";
  import { useUserStore } from "../../stores/ServiceUser.js";
  import User from '../../classes/user.js';
  import { createApp } from 'vue';

  const router = useRouter();
  const userStore = useUserStore();
  const app = createApp({});
  app
    .component('AppSingIn', AppSingIn)

    const loginUser = async (inputs) =>{
      let user = new User(null, null, inputs[0].value, inputs[1].value, null);//email & pass
      if(user.email && user.password){
        try {
          await userStore.logInUser(user.email, user.password);
          router.push({ path: "/dashboard" });
        } catch (e) {
          console.log(e);
        }
      }else {
        console.log("Unexpected error non existent user data, restart the page");
      } 
     };
</script>
    
<template>
    <AppSingIn @loginForm="loginUser"/>
</template>

<style scoped>

</style>
