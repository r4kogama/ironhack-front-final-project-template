  <template>
    <v-navigation-drawer color="cyan" class="mt-3" v-model="drawer" temporary>
      <v-list class="pt-10" density="compact"  nav>
   <router-link :to="'/dashboard'" v-if="userData !== null">
          <v-list-item prepend-avatar="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="text-size-menu"  :title="userData.name.concat(' ').concat(userData.surname).toUpperCase()" value="dashboard"></v-list-item>
        </router-link>
        <router-link :to="'/home'">
          <v-list-item class="text-size-menu"  title="HOME" value="home"></v-list-item>
        </router-link>
        <router-link :to="'/register'">
          <v-list-item  title="REGISTER" value="register"></v-list-item>
        </router-link>
        <router-link :to="''">
          <v-list-item  title="CONTACT US" value="contact"></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </template>

  <script setup>
     import { userStore } from "../../stores/ServiceUser.js";
    import { storeToRefs } from "pinia";
    import { createApp, onMounted, ref } from 'vue';
    const userStoreService = userStore();
    const { user, userData } = storeToRefs(userStoreService);
    const props = defineProps({
      drawer: Boolean,
    });
  </script>

  <style scoped>
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
