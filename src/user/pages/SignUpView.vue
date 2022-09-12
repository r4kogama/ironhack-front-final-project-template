<script setup>
  import AppSignUp from '../components/SignUpComponent.vue';
  import { useRouter } from "vue-router";
  import { useUserStore } from "../../stores/ServiceUser.js";
  import User from '../../classes/user.js';
  import { createApp } from 'vue';

  const router = useRouter();
  const userStore = useUserStore();
  const app = createApp({});
  app
    .component('AppSignUp', AppSignUp)

    const registerUser = async (inputs) =>{
        //name, surname, email, pass, terms
        let user = new User(inputs[0].value, inputs[1].value, inputs[2].value,inputs[3].value, inputs[5].value)
        if ( user.password && user.email && user.name && user.surname && user.terms) {
          try {
            await userStore.signUpAuth(
              user.email,
              user.password
            );
            await userStore.signUpUser(
              user.name,
              user.surname,
              user.terms,
            )
            router.push({ path: "/home" });
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("Unexpected error nonexistent user data, restart the page");
        }
      }

</script>
    
<template>
    <AppSignUp @registerForm="registerUser"/>
</template>

<style scoped>

</style>
    