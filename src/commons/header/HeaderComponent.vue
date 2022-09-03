<template>
    <v-app-bar color="indigo accent-2" class="d-flex justify-space-between text-right pa-2" justify="center" density="compact">
        <v-app-bar-title><h2 class="text-h5 mr-5">Project VUE IronHack</h2></v-app-bar-title>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
    </v-app-bar>
</template>

<script >
  export default {
    name: "Header",
  };
</script> 
<style scoped>
  
</style>
