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
  const props =  defineProps({
    formRules: Object,
  })


  const emits = defineEmits(['registerForm']);
  const signUpSubmit = (event) => {
    try{
      if (!form.value) return;
      loading.value = true;
      let formValues = [...event.currentTarget];
      setTimeout(() => (loadingForm()), 2000);
      const loadingForm = () => {
        loading.value = false;//stop animation
        if(loading.value === false){
          emits('registerForm', formValues); 
        } 
      }
    }catch(err){
      console.log(err);
    }
  };
</script>


<template>
  <v-sheet class="pa-6 d-flex align-center pb-10 pt-10" min-height="100vh"  color="#e0f7fac2" rounded>
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
                :type="'text'"
                :rules="[props.formRules.nameUser, props.formRules.required]"
                prepend-inner-icon="mdi-card-account-details-outline">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="surname" label="Surname" placeholder="Enter your surname" variant="outlined" clearable
                prepend-inner-icon="mdi-card-account-details-outline"
                :type="'text'"
                :rules="[props.formRules.nameUser, props.formRules.required]">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="email" label="Email" placeholder="Enter your email" variant="outlined" clearable
              prepend-inner-icon="mdi-email-outline" 
              :type="'email'" 
              :rules="[props.formRules.mail, props.formRules.required]">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="password" label="Password" class="" placeholder="Enter your password" variant="outlined" clearable
                :readonly="loading"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="[props.formRules.required, props.formRules.password]"
                prepend-inner-icon="mdi-lock-outline"
                @click:append-inner="show = !show">
              </v-text-field>
              <v-spacer class="pt-2 pb-2"></v-spacer>
              <v-text-field v-model="repass" label="Repeat Password" placeholder="Repeat your password" variant="outlined" clearable
                prepend-inner-icon="mdi-lock-outline"
                :type="'password'"
                :rules="[props.formRules.required, props.formRules.matchPassword]">
              </v-text-field>
              <v-checkbox v-model="terms" class="terms" color="#3f51b5" label="I agree to site terms and conditions"
                :rules="[props.formRules.required]">
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
}
.background-box-singup{
  background: url('../../assets/undraw_personal_information_re_vw8a.svg') no-repeat;
  background-size: 80%;
  background-position-x: right;
  background-position-y: top;
}

</style>
