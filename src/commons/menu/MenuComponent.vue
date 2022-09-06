  <template>
    <v-navigation-drawer color="cyan" class="mt-3" v-model="drawer" temporary>
      <v-list-item prepend-avatar="" title=""></v-list-item>
      <v-list density="compact"  nav>
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

  <script >
    export default{
      name: "Menu",
      components:{},
      data: () => ({
       
      }),
      props: {
        drawer: Boolean,
      },
    };
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
