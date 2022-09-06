<script setup>
import { ref } from '@vue/reactivity';

  const email = ref(null);
  const name = ref(null);
  const password = ref(null);
  const repass = ref(null);
  const form = ref(false);
  const show = ref(false);
  const terms = ref(false); 
  const loading = ref(false); 
  const rules = ref({
          required: value => !!value || 'Field is required.',
          min: value => value.length >= 6 || 'Min 6 characters.',
          max: value => value.length <= 15 || 'Max 15 characters.',
          matchPassword: (value) => value === password.value || 'The password confirmation does not match.',
          password: value => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return regex.test(value) || "Min 6 chars, min 1 capital, min 1 number";
          },
          nameUser: value => {
            const regex = /^[^0-9][a-zA-Z\s]{2,15}$/;
            return regex.test(value) || "This name user isn't valid.";
          },
          mail: value => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) || "This e-mail isn't valid." ;
          }
        });

      const emit = defineEmits(['registerForm']);
      const signUpSubmit = (event) => {
        try{
          if (!form.value) return;
          loading.value = true;
          setTimeout(() => (loading.value = false), 2000);
          let formValues= [...event.currentTarget.value];
          //crear clase user
          emit('registerForm',  event.target.value);
        }catch(err){
          console.log(err);
        }
      };
</script>


<template>
  <v-sheet class="pa-6 d-flex align-center pb-10 pt-10" height="100vh"  color="#e0f7fac2" rounded>
    <v-container class="pb-10 pt-10 background-box-singup">
      <v-row no-gutters> 
        <v-col cols="12" lg="12">
        <v-card class="mx-auto background-register-title" max-width="380">
          <h2 class=" text-center pt-6 pb-6">User Register Form </h2>
        </v-card>
        <v-spacer class="pt-3 pb-3"></v-spacer>
        <v-card  v-bind:style="{background: '#fffffff2'}" class="mx-auto" max-width="380">
          <v-form v-model="form" @submit.prevent="signUpSubmit">
            <v-container>
              <v-text-field v-model="name" label="Name" placeholder="Enter your name" variant="outlined" clearable
                prepend-inner-icon="mdi-card-account-details-outline"
                :type="'text'"
                :rules="[rules.nameUser, rules.max, rules.required]">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="email" label="Email" placeholder="Enter your email" variant="outlined" clearable
              prepend-inner-icon="mdi-email-outline" 
              :type="'email'" 
              :rules="[rules.mail, rules.required]">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="password" label="Password" class="" placeholder="Enter your password" variant="outlined" clearable
                :readonly="loading"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[rules.required, rules.password]"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="show = !show">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="repass" label="Repeat Password" placeholder="Repeat your password" variant="outlined" clearable
                prepend-inner-icon="mdi-lock-outline"
                :type="'password'"
                :rules="[rules.required, rules.matchPassword]">
              </v-text-field>
              <v-checkbox v-model="terms" class="terms" color="#3f51b5" label="I agree to site terms and conditions"
                :rules="[rules.required]">
              </v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-hover v-slot="{ isHovering, props }">
                <v-btn block color="cyan darken-1" class="btn-text-size"  size="large" type="submit" variant="elevated"
                  :disabled="!form"
                  :loading="loading"
                  :rounded="0"
                  :elevation="isHovering ? 8 : 2"
                  v-bind="props">
                  Register
                </v-btn>
              </v-hover>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row> 
    </v-container>
  </v-sheet>
</template>


<style>
.bg-cyan {
     color: white!important;
}
.terms .v-label{
  font-size: .8em!important;
}
.background-register-title{
  background:#ffffff00 url('../../assets/wave-haikei-down.svg')no-repeat center/cover !important;
  background-position-y:90%!important;
  letter-spacing: 2px;
  color:var(--primary)!important;
  font-size: 1.2em;
  text-shadow: 2px 2px 0px white, 2px 2px 2px var(--primary);
}
.background-box-singup{
  background: url('../../assets/undraw_personal_information_re_vw8a.svg') no-repeat;
  background-size: 80%;
  background-position-x: right;
  background-position-y: top;
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
