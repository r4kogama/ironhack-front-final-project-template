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

  import { onMounted, ref } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import { createApp } from 'vue';
  

  const app = createApp({});
  app
    .component('AppHeader', AppHeader)
    .component('AppMenu', AppMenu)


     const drawer = ref(false);

     const showMenu = () =>{
      drawer.value = !drawer.value;
      console.log(drawer.value)
     };

    /*  onMounted(async () => {
        try {
          await userStore.fetchUser();
          if (!user.value) {
            router.push({ path: "/auth" });
          } else {
            router.push({ path: "/" });
          }
        } catch (e) {
          console.log(e);
        }
      });  */
</script>
