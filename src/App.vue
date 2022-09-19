<template>
<v-app>
  <v-container>
      <AppHeader :drawer="drawer"  @clickMenu="showMenu()"/>
      <AppMenu :drawer="drawer" />
    <router-view/>
  </v-container>
</v-app>
</template>

<script setup>
  import AppHeader from "./commons/header/HeaderComponent.vue";
  import AppMenu from "./commons/menu/MenuComponent.vue";
  import { userStore } from "./stores/ServiceUser.js";
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import { createApp } from 'vue';
  

  const app = createApp({});
  app
    .component('AppHeader', AppHeader)
    .component('AppMenu', AppMenu)

    const drawer = ref(false);
    const userStoreService = userStore();
    const { user } = storeToRefs(userStoreService);
    const router = useRouter();

     const showMenu = () =>{
      drawer.value = !drawer.value;
     };

    onMounted(async () => {
      try {
        await userStoreService.fetchUser();
        if (user.value !== null) {
          router.push({ path: "/dashboard" });
        } else {
          router.push({ path: "/" });
        }
      } catch (err) {
        console.log(err);
      }
    });  
</script>
