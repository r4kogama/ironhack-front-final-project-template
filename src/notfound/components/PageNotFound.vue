<template>
  <div class="background-404">
<!--     <v-hover v-slot="{ isHovering, props }">
      <v-btn rounded="pill"  class="btn-text-size btn-home pl-5 pr-5" depressed color="cyan accent-2" v-bind="props" :elevation="isHovering ? 10 : 2" size="large" variant="elevated">
        <router-link  :to="'/home'">Space travel to home</router-link>
      </v-btn>
    </v-hover> -->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.background-404{
  width: 100%;
  height: 100vh;
  background: url('../../assets/404-error-not-found-1.png') no-repeat;
  background-size: contain;
  background-position: center;
}

.btn-home{
  font-size: 1em;
}
</style>
