<template>
    <v-dialog class="dialog-edit" v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn class="btn-edit style-icon" color="warning"  variant="elevated"  v-bind="props" >
          <v-icon  text-color="white" >mdi-pencil</v-icon>
          <v-tooltip activator="parent" location="top">Edit task</v-tooltip>
        </v-btn>
      </template>
        <v-row no-gutters> 
          <v-col cols="12" lg="12" :style="{ 'padding':'0px 20px' }">
          <v-card class="mx-auto background-register-title" >
            <h2 class=" text-center pt-6 pb-6">Edit Task Form </h2>
          </v-card>
          <v-spacer class="pt-3 pb-3"></v-spacer>
          <v-card  v-bind:style="{background: '#fffffff2'}" class="mx-auto" >
            <v-form v-model="form" @submit.prevent="editTaskSubmit">
              <v-container>
                <v-text-field v-model="id" readonly 
                  :type="'hidden'"
                  :value="id">
                </v-text-field>
                <v-text-field v-model="title" label="Title Task" placeholder="Enter a short title"  clearable
                  :type="'text'"
                  :rules="[ formRules.required, formRules.min, formRules.max ]"
                  :value="title"
                  outlined
                  prepend-inner-icon="mdi-card-text">
                </v-text-field>
                <v-spacer class="pt-2 pb-2"></v-spacer>
                <v-textarea v-model="description"
                  :rules="[ formRules.required, formRules.text]"
                  prepend-inner-icon="mdi-comment"
                  :value="description"
                  label="Description"
                  rows="3"
                  auto-grow
                  counter="255"
                  clearable
                ></v-textarea>
              </v-container>
              <v-divider></v-divider>
              <v-card-actions class="box-actions-edit">
                <v-spacer></v-spacer>
                <div class="containt-button">
                  <div class="box-remove">
                    <AppModalRemove :idtask="id" @emitRemove="emitRemove"/>
                  </div>
                  <div class="box-btns-actions pl-2 pr-2">
                    <div class="box-close">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn v-bind="props" :elevation="isHovering ? 3 : 2" class="btn-close pr-5 pl-5" color="#00bcd4"  @click="dialog = false">close<v-icon class="pl-2">mdi-cancel</v-icon></v-btn>
                      </v-hover>
                    </div>
                    <div class="box-save">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn  color="#3f51b5" class="pr-5 pl-5  text-center text-white"  type="submit" variant="elevated"
                        :disabled="!form"
                        :loading="loading"
                        :rounded="3"
                        :elevation="isHovering ? 5: 2"
                        v-bind="props" >
                        Save
                        <v-icon  class="pl-5" color="white" right>mdi-content-save</v-icon>
                      </v-btn>
                      </v-hover>
                    </div>
                  </div>
                </div>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
</template>

<script setup>
  import {createApp, ref, inject, reactive } from 'vue';
  import AppModalRemove from './ModalRemove.vue';
  const title = ref(task.dataTask.title);
  const description = ref(task.dataTask.description);
  const id = ref(task.dataTask.id);
  const form = ref(false);
  const loading = ref(false);
  const dialog = ref(false);
  const formRules = inject('rules');
  const app = createApp({});
  app
    .component('AppModalRemove', AppModalRemove)
  const task = defineProps({
    dataTask : Object
  });
  


  const emits = defineEmits(['editTask','emitRemoveTask']);
  const editTaskSubmit = (event) => {
    try{
      if (!form.value) return;
      loading.value = true;
      const formValues = [...event.currentTarget];
      setTimeout(() => (loadingForm()), 1000);
      const loadingForm = () => {
        loading.value = false;//stop animation
        if(loading.value === false){
          emits('editTask', formValues); 
          dialog.value = false;
        } 
      }
    }catch(err){
      console.log(err);
    }
  }; 
  const emitRemove = (idTask) =>{
    emits('emitRemoveTask', idTask);
  };
</script>
<style scoped>

.v-timeline--vertical.v-timeline {
    grid-template-columns: auto 70px auto;
}


.btn-close{
    background: var(--secondary);
    color:black;
    font-weight: bold;
  }

.containt-button{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 0px 10px;
}
.box-remove{
  padding-bottom: 20px;
  flex-basis: 47px;
}
.box-close, .box-remove, .box-save{
  padding-bottom: 15px;
}
 .box-save{
  padding-left: 20px;
}

.box-btns-actions{
  display: flex;
    max-width: 285px;
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
}
.dialog-edit .background-register-title {
  background-position-y: 75%!important;
  box-shadow: none;
}

</style>