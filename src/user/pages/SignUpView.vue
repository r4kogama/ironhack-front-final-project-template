<script setup>
  import AppSignUp from '../components/SignUpComponent.vue';
  import { useRouter } from "vue-router";
  import { userStore } from "../../stores/ServiceUser.js";
  import User from '../../classes/user.js';
  import Tostar from '../../classes/tostar.js';
  import { createApp, ref } from 'vue';

  const router = useRouter();
  const userStoreService = userStore();
  const app = createApp({});
  app
    .component('AppSignUp', AppSignUp)

  //form control reative
  const formRules = ref({
        required: value => !!value || 'Field is required.',
        min: value => value.length >= 6 || 'Min 6 characters.',
        max: value => value.length <= 20 || 'Max 20 characters.',
        matchPassword: (value) => value === password.value || 'The password confirmation does not match.',
        password: value => {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          return regex.test(value) || "Min 6 chars, min 1 capital, min 1 number";
        },
        nameUser: value => {
          const regex = /^[^0-9][a-zA-Z\s]{2,20}$/;
          return regex.test(value) || "This name user isn't valid.";
        },
        mail: value => {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(value) || "This e-mail isn't valid." ;
        }
  });

  //create object user and request store user for singUp 
  const registerUser = async (inputs) =>{
      //name, surname, email, pass, terms
      let user = new User(inputs[0].value, inputs[1].value, inputs[2].value,inputs[3].value, inputs[5].value);
      if ( user.password && user.email && user.name && user.surname && user.terms) {
        try {
          await userStoreService.signUpAuth(
            user.email,
            user.password
          );
          await userStoreService.signUpUser(
            user.name,
            user.surname,
            user.terms,
          )
        /*let tostar = new Tostar(`User created! confirmation email sent to ${user.email}`);
          tostar.createTostar(tostar);
          tostar.counterBack(); */
          router.push({ path: "/home" });
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Unexpected error nonexistent user data, restart the page");
      }
    };

</script>
    
<template>
    <AppSignUp @registerForm="registerUser" :formRules="formRules" />
</template>

<style scoped>

</style>
    