
<template>
  <v-app>
    <AppHeader :drawer="drawer"  @clickMenu="showMenu()"/>
      <AppMenu :drawer="drawer" />
      <v-main>
        <v-sheet class="overflow-y-auto pa-6 background-box-headling" color="#E0F7FA" rounded>
          <h1 class="text-center mt-10 mb-10" color="white">Task Web Application</h1>
        </v-sheet>
        <v-spacer class="pb-5"></v-spacer>
        <AppSignIn/>
        <v-spacer class="pb-5"></v-spacer>
      </v-main>
      <AppFooter/>
  </v-app>
</template>

<script >
  
  import HeaderComponent  from "../header/HeaderComponent.vue";
  import FooterComponent  from "../footer/FooterComponent.vue"; 
  import SignInView from '../../user/pages/SignInView.vue';
  import MenuComponent from "../menu/MenuComponent.vue";

  export default {
    name: "Home",
    components :{
      AppHeader : HeaderComponent,
      AppFooter : FooterComponent,
      AppSignIn : SignInView,
      AppMenu : MenuComponent
    },
    data: () => ({
       drawer: false, 
    }),
    methods:{
      showMenu(){
        this.drawer = !this.drawer;//drawer === false ? true : false;
      }
    }
  }; 
</script>

<style>
  @import "../../assets/main.css";
  h1{
    color: white;
    font-size: 3em;
    letter-spacing: 2px;
    text-shadow: 2px 2px 0px var(--primary), 3px 3px 0px var(--secondary);
  }
  .background-box-headling{
    background:url('../../assets/wave-haikei-up.svg') no-repeat;
    background-size: cover;
    background-position-y: 5%;
  }
  .v-list-item-title{
    font-size:1.2em!important;
  }
  .v-list-item:hover > .v-list-item__overlay {
    opacity: 1!important;
  }
  .v-list-item__overlay {
    background-color: var(--primary)!important;
  }
</style>
