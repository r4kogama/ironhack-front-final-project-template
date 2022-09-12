<template>
    <v-app-bar fixed    color="indigo accent-2" class="d-flex justify-space-between align-center text-right pa-2" justify="center" density="compact">
      <router-link v-if="this.$route.path === '/register'"  :to="'/home'">
        <v-btn color="cyan darken-1" class="text-white btn-text-size back-home pl-5 pr-5 "  size="large"  variant="elevated"
        rounded>
        <v-icon color="white" class="icon pt-1">mdi-arrow-left-bold-circle-outline</v-icon>
        Back to Home
       </v-btn>
      </router-link>
      <v-app-bar-title v-else-if="this.$route.path === '/'">
       <h2 class="text-h5 mr-5">Project VUE IronHack</h2>
      </v-app-bar-title>
      <template v-slot:prepend>
          <v-app-bar-nav-icon v-if="drawer === false"  @click.stop="$emit('clickMenu')" ></v-app-bar-nav-icon>
          <v-btn  v-else-if="drawer === true"  @click.stop="$emit('clickMenu')" color="transparent"  variant="elevated" >
            <v-icon class="icon-close" color="white">mdi-close-thick</v-icon>
          </v-btn>
      </template>
    </v-app-bar>
</template>

<script>
export default {
    props: {
        drawer: Boolean,
    },
    data: () => ({

    })
  }; 
</script> 
<style scoped>
.icon-close{
  font-size:2em;
}

.back-home{
  font-size:.7em!important;
}
.back-home:hover .icon{
  padding-right: 10px;
  transition: all 250ms ease-out;
}
.back-home .icon{
  padding-right: 5px;
  transition: all 250ms ease-out;
}
</style>
