<script setup>
  import AppSingIn from '../components/SignInComponent.vue';
  import { useRouter } from "vue-router";
  import { userStore } from "../../stores/ServiceUser.js";
  import User from '../../classes/user.js';
  import Tostar from '../../classes/tostar.js';
  import { createApp, ref, provide, onBeforeMount, onUnmounted } from 'vue';
  import AppTostar from '../../commons/message/pages/TostarView.vue';

  const router = useRouter();
  const count = ref(3);
  const time = ref(0);
  const tostar = ref();
  const show = ref(false);
  const data = ref([]);
  provide( 'tostarData', data);
  const userStoreService = userStore();
  const app = createApp({});
  app
  .component('AppSingIn', AppSingIn)
  .component('AppTostar', AppTostar)


  //form control reative
  const formRules = ref({
        required: value => !!value || 'Field is required',
        min: value => value.length >= 6 || 'Min 6 characters',
        password: value => {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
          return regex.test(value) || "Min 6 chars, min 1 capital, min 1 number";
        },
        mail: value => {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(value) || "This e-mail isn't valid." ;
        }
      });

  //create object user and request store user for login with mail & pass
  const loginUser = async (inputs) =>{
    let user = new User(null, null, inputs[0].value, inputs[1].value, null);//email & pass
    
    if(user.email && user.password){
      try {
        await userStoreService.logInUser(user.email, user.password);
        router.push({ path: "/dashboard" });
      } catch (err) {
        generateTostar(err);
      }
    }else {
      console.log("Unexpected error non existent user data, restart the page");
    } 
    };

  const generateTostar = (err) =>{
    try{
      show.value = true;
      let objTostar = new Tostar(err.message, 'warning');
      tostar.value = objTostar;
      data.value.push(show.value);
      data.value.push(tostar.value);
    }catch(err){
      console.log(err);
    }
  };
  
</script>
    
<template>
    <AppSingIn @loginForm="loginUser" :formRules="formRules"/>
    <AppTostar v-if="show === true"/>
</template>

<style scoped>

</style>
