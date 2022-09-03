<template>
    <v-container>
      <router-view/>
    </v-container>
</template>

<script>
import HomeComponent  from './commons/home/HomeComponent.vue'
import SignUpComponentVue from './user/components/SignUpComponent.vue'

export default {
  name: 'App',
  components :{
    AppHome : HomeComponent,
    AppSignUp: SignUpComponentVue
  },
  data: () => ({
    //
  }),
}
</script>

<style scoped>
.v-application {
  background: transparent;
}
</style>
