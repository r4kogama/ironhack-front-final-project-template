<template>
    <v-footer color="indigo accent-2 text-center">
      <v-row justify="center" no-gutters>
        <v-col cols="12" >
          <router-link  v-for="link in links" 
              to="{{link.path}}">
            <v-btn 
              :key="link.name"
              color="cyan accent-1"
              variant="outline"
              class="mx-2">
              {{ link.name }}
            </v-btn>
          </router-link>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" >
          <v-card-text>
            <v-btn v-for="icon in icons" class="mx-4" color="white" size="small"
              :key="icon"
              :icon="icon"
              variant="plain"></v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-card-text class="d-flex  justify-sm-center justify-md-space-between justify-lg-space-between text-center copyright text-white">
            <p class="pr-5">© IronHack {{ new Date().getFullYear() }}. All rights reserved.</p>  
            <p>Design by <strong>Gama</strong> & powered by <strong>Material Design</strong></p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-footer>
</template>

 <script setup>
  import { ref } from '@vue/reactivity';

  const links = ref([
    {path:'/home', name: 'Home'},{ path: '', name: 'About us'},{ path:'', name: 'Team'},{path: '', name: 'Contact Us'}
    ]);
  const icons = ref(['mdi-facebook', 'mdi-twitter', 'mdi-linkedin']);
 </script> 

<style>
  .v-card-text {
    padding: 0.5rem!important;
  }
  .copyright{
    padding: 0;
    font-size:.7em!important;
    flex-wrap: wrap;
  }

</style>
  