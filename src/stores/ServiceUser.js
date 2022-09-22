import { defineStore } from 'pinia';
import { supabase } from '../supabase';


export const userStore = defineStore('user', {
  state: () => ({
    user: null,
    userData : null
  }),

  actions: {
    async fetchUser () {
      const user = await supabase.auth.user();
      this.user = user;
      
    },
    async fetchUserData () {
      const { data, error } = await supabase.from('userdata').select('*').match({ id: this.user.id });
      if(error) throw error;
      this.userData = data[0];
    },
    //only auth
    async signUpAuth ( email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    //save data user another table with foreing key to Auth
    async signUpUser (nameUser, surname, terms) {
      const { dataUser, error } = await supabase
      .from('userdata')
      .insert([{ id: this.user.id, name: nameUser, surname: surname, avatar: null, terms: terms  }])
      if (error) throw error;
    },
    async logInUser (email, password) {
      const { user, error } = await supabase.auth.signIn({
        email,
        password
      });
      if (error) throw error;
      if (user) this.user = user;//actualiza el estado
      this.fetchUserData();
    },
    async signOut () {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  /*     window.onbeforeunload = function() {
        localStorage.clear();
      }; */
      this.userData = null;
      this.user = null;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
      
    ]
  },
});
