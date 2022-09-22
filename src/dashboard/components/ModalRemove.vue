<template>
  <div class="text-center style-dialog-remove">
     <v-row justify="center">
       <v-col cols="auto">
         <v-dialog v-model="dialog" persistent >
           <template v-slot:activator="{ props }">
                <v-btn class="style-icon" v-bind="props"  color="error" >
                  <v-icon size="large" text-color="white" >mdi-clipboard-remove-outline</v-icon>
                  <v-tooltip activator="parent" location="top">Remove Task</v-tooltip>
                </v-btn>
           </template>
           <v-form v-model="form" @submit.prevent="removeTaskSubmit">
            <v-card  class="box-card-delete pl-3 pr-3 pt-1 pb-1">
              <v-card-text>
                <v-alert prominent type="error" variant="outlined">
                  Are you sure you want to <strong>delete</strong> definitely this <strong>task</strong> ?
                </v-alert>
                  <v-text-field v-model="id" readonly 
                      :type="'hidden'"
                      :value="id">
                  </v-text-field>
              </v-card-text>
              <v-card-actions >
                  <div class="containt-button-remove pl-2 pr-2">
                    <div class="box-close">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn v-bind="props" 
                        :elevation="isHovering ? 3 : 2" 
                        class="btn-close btn-style-confirm pr-5 pl-5" color="white"  
                        @click.stop="dialog = false">no 
                        <v-icon class="pl-4">mdi-cancel</v-icon></v-btn>
                      </v-hover>
                    </div>
                    <div class="box-confirm">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn class="btn-style-confirm" v-bind="props" type="submit"  :loading="loading" :elevation="isHovering ? 3 : 2" color="error" >
                          Yes
                          <v-icon class="pl-4" color="error" size="x-large" >mdi-close-octagon</v-icon>
                        </v-btn>
                      </v-hover>
                    </div>
                  </div>
              </v-card-actions>
            </v-card>
          </v-form>
         </v-dialog>
       </v-col>
     </v-row>
   </div>
 </template>
 
 <script setup>
  import { ref } from 'vue';
  const dialog = ref(false);
  const id = ref(task.idtask);
  const form = ref(false);
  const loading = ref(false);
  const task = defineProps({
    idtask : Number
  });

  const emits = defineEmits(['emitRemove']);
  const removeTaskSubmit = (event) => {
    try{
      if (!form.value) return;
      loading.value = true;
      setTimeout(() => (loadingForm()), 1000);
      const loadingForm = () => {
        loading.value = false;//stop animation
        if(loading.value === false){
          emits('emitRemove', id); 
        } 
      }
    }catch(err){
      console.log(err);
    }
  }; 
 </script>
 
 <style scoped>
   .btn-show{
     background: var(--primary);
     color:white;
   }
   .btn-close{
     background: var(--primary);
   }

   .box-card-delete{
    background: #1a1919;
   }
   .v-overlay__content {
     position: relative;
     left: 27px;
   }
   .containt-button-remove{
      display:flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
   }
   .btn-style-confirm{
    width: 100px;
    height: 60px;
    color:white;
     font-size: 1.2em;
     letter-spacing: 2px;
     text-shadow:  1px 2px 0px black;
     font-weight: bold;
   }
 </style>