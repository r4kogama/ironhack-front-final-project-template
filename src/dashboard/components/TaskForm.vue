<script setup>
  import { ref } from '@vue/reactivity';
  const title = ref(null);
  const form = ref(false);
  const loading = ref(false);
  const props =  defineProps({
    formRules: Object,
  })

  const emits = defineEmits(['createTask']);
  const taskSubmit = (event) => {
    try{
      if (!form.value) return;
      loading.value = true;
      setTimeout(() => (loadingForm()), 1000);
      const loadingForm = () => {
        loading.value = false;//stop animation
        if(loading.value === false){
          emits('createTask', title); 
        } 
      }
    }catch(err){
      console.log(err);
    }
  };
</script>
    
<template>
  <v-sheet class="pa-6  pb-10 pt-10" min-height="100vh"  color="#7cf0ff" rounded>
    <v-container class=" box-form background-box-addtask">
      <v-row no-gutters> 
        <v-col cols="12" lg="12" >
        <div class=" timeline-task timeline-style">
          <div class="containt-card-task">
            <v-card class="mx-auto background-register-title" width="100%">
            <h2 class=" text-center pt-6 pb-6">New Task Form </h2>
          </v-card>
          <v-spacer class="pt-3 pb-3"></v-spacer>
          <v-card  v-bind:style="{background: '#fffffff2'}" class="mx-auto" width="100%">
            <v-form v-model="form" @submit.prevent="taskSubmit">
              <v-container>
                <v-text-field v-model="title" label="Title Task" placeholder="Enter a short title" variant="outlined" clearable
                  :type="'text'"
                  :rules="[ props.formRules.required, props.formRules.min, props.formRules.max ]"
                  prepend-inner-icon="mdi-card-text">
                </v-text-field>
                <v-spacer class="pt-2 pb-2"></v-spacer>
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
                    Create Task
                    <v-icon class="pl-5" color="white" right >mdi-note-plus</v-icon>
                  </v-btn>
                </v-hover>
              </v-card-actions>
            </v-form>
          </v-card>
          </div>
        </div>
      </v-col>
    </v-row> 
    </v-container>
  </v-sheet>
</template>

<style scoped>
.background-box-addtask{
  background: url('../../assets/undraw_add_tasks.svg') no-repeat;
  background-size: 80%;
  background-position-x: center;
  background-position-y: bottom;
  height: 100vh;
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  padding: 0;
  filter: opacity(1);
}
.box-form{
  padding-left: 0;
  overflow: auto;
}
.containt-card-task{
  transform: translate(0%, 50%);
    max-width: 380px;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
}
</style>
    