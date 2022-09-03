<script setup>

  import { ref } from '@vue/reactivity';

  const email = ref('');
  const password = ref('');
  const form = ref(false);
  const show = ref(false);
  const loading = ref(false); 
  const rules = ref({
          required: value => !!value || 'Field is required',
          min: value => value.length >= 6 || 'Min 6 characters',
        });
  const emit = defineEmits(['loginForm']);
  const signInSubmit = (event) => {
        if (!form) return;
        loading = true;
        setTimeout(() => (loading = false), 2000);
        console.log(event.target.value);
        emit('loginForm',  event.target.value);
  };
 
/*   export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
      show: false,
      rules: {
          required: value => !!value || 'Field is required',
          min: value => value.length >= 6 || 'Min 6 characters',
        },
    }),

    methods: {
      signInSubmit () {
        if (!this.form) return
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
        this.$emit('loginForm', this.form.value);
      },
     
    },
  } */
</script>
    
<template>
  <v-sheet class="pa-6 d-flex align-center pb-10 pt-10"  color="#E0F7FA" rounded>
    <v-container class="pb-10 pt-10 background-box-singin">
      <v-row no-gutters> 
        <v-col cols="12" lg="6" sm="12">
          <v-card class="mx-auto px-6 py-8 mt-10 mb-10" color="white" max-width="400" rounded>
            <h2 class="pb-5 text-center font-weight-medium text-uppercase">Log in</h2>
            <v-form v-model="form" @submit.prevent="signInSubmit">
              <v-text-field v-model="email" label="Email" class="mb-2"  placeholder="Enter your Email" variant="outlined" clearable
                :readonly="loading"
                :rules="[rules.required]"
                prepend-inner-icon="mdi-email-outline">
              </v-text-field>
  
              <v-text-field v-model="password" label="Password" class="mb-2" placeholder="Enter your password" variant="outlined" clearable
                :readonly="loading"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="show = !show">
              </v-text-field>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn block color="cyan darken-1" class="btn-text-size"  size="large" type="submit" variant="elevated"
                  :disabled="!form"
                  :loading="loading"
                  :rounded="0"
                  :elevation="isHovering ? 8 : 2"
                  v-bind="props">
                  Sign In
                </v-btn>
              </v-hover>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" sm="12">
          <v-card class="card-account mx-auto px-6 py-8 mt-10 mb-10 text-center d-flex justify-center align-center  align-content-space-between flex-wrap"   max-width="400" height="336" rounded>
            <h2 class="pb-5 font-weight-medium text-uppercase">Create Account</h2>
            <p class="font-weight-medium explain-account">Create a new account and we offer you an interface where you can will record your daily tasks, edit them, mark them as completed and more.</p>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn block class="btn-text-size"  depressed color="cyan accent-2"  :rounded="0" v-bind="props" :elevation="isHovering ? 10 : 2" size="large" variant="elevated">
                <router-link  :to="'/register'">Sign Up</router-link>
              </v-btn>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>

.background-box-singin{
  background: url('../../assets/undraw_completed_tasks_vs6q.svg') no-repeat;
  background-size: contain;
    background-position-x: 80%;
    background-position-y: bottom;
}
.card-account{
  background:#fbfbfb4d;
}

.bg-cyan {
     color: white!important;
}
.explain-account{
  font-size:1.2em;
}
</style>
    