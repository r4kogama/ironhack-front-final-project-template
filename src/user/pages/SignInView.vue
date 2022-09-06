<script >
import SignInComponent from '../components/SignInComponent.vue';
  export default {
    name: "SignIn",
    components :{
      AppSingIn : SignInComponent,
    },
    methods: {
      loginUser(data){
        console.log(data)
      }
    }
  };
</script>
    
<template>
    <AppSingIn @loginForm="loginUser(data)"/>
</template>

<style scoped>

</style>
