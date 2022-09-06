<script >
import HeaderComponent from '../../commons/header/HeaderComponent.vue';
import MenuComponent from '../../commons/menu/MenuComponent.vue';
import SignUpComponent from '../components/SignUpComponent.vue'
  export default{
    name: "SignUp",
    components:{
      AppSignUp : SignUpComponent,
      AppHeader : HeaderComponent,
      AppMenu : MenuComponent
    },
    data: () => ({
       drawer: false, 
    }),
    methods: {
      registerUser(data){
        console.log(data)
      },
      showMenu(){
        this.drawer = !this.drawer;//drawer === false ? true : false;
      }
    }
  };
</script>
    
<template>
  <v-app>
    <AppHeader :drawer="drawer"  @clickMenu="showMenu()"/>
    <AppMenu :drawer="drawer" />
    <AppSignUp @registerForm="registerUser(data)"/>
  </v-app>
</template>

<style scoped>

</style>
    